import supabase from "../config/supabase";
import { Driver } from "../types/driver";

export interface FantasyTeam {
  id?: string;
  user_id: string;
  team_name?: string;
  share_token: string;
  is_locked: boolean;
  created_at?: string;
  updated_at?: string;
  year: number;
  round: number;
}

export interface FantasyTeamDriver {
  id?: string;
  fantasy_team_id: string;
  driver_code: string;
  driver_cost_at_selection: number;
  added_at?: string;
}

export interface FantasyTeamWithDrivers extends FantasyTeam {
  drivers: Driver[];
}

export class FantasyService {
  static async saveFantasy(
    userId: string,
    year: number,
    round: number,
    drivers: Driver[]
  ): Promise<FantasyTeamWithDrivers | null> {
    try {
      // First, check if a fantasy team already exists for this user, year, and round
      const { data: existingTeam, error: fetchError } = await supabase
        .from("fantasy_teams")
        .select("id")
        .eq("user_id", userId)
        .eq("year", year)
        .eq("round", round)
        .single();

      let teamId: string;

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error checking existing team:", fetchError);
        return null;
      }

      if (existingTeam) {
        // Update existing team
        teamId = existingTeam.id;
        
        // Delete existing drivers for this team
        const { error: deleteError } = await supabase
          .from("fantasy_team_drivers")
          .delete()
          .eq("fantasy_team_id", teamId);

        if (deleteError) {
          console.error("Error deleting existing drivers:", deleteError);
          return null;
        }
      } else {
        // Create new team
        const { data: newTeam, error: insertError } = await supabase
          .from("fantasy_teams")
          .insert({
            user_id: userId,
            year: year,
            round: round,
            team_name: `Fantasy Team ${new Date().toLocaleDateString()}`,
          })
          .select()
          .single();

        if (insertError) {
          console.error("Error creating fantasy team:", insertError);
          return null;
        }

        teamId = newTeam.id;
      }

      // Insert new drivers
      if (drivers.length > 0) {
        const driverEntries = drivers.map(driver => ({
          fantasy_team_id: teamId,
          driver_code: driver.driverCode,
          driver_cost_at_selection: driver.cost,
        }));

        const { error: driversError } = await supabase
          .from("fantasy_team_drivers")
          .insert(driverEntries);

        if (driversError) {
          console.error("Error inserting drivers:", driversError);
          return null;
        }
      }

      // Return the complete team with drivers
      return await this.loadFantasy(userId, year, round);
    } catch (error) {
      console.error("Error saving fantasy:", error);
      return null;
    }
  }

  static async loadFantasy(
    userId: string,
    year: number,
    round: number
  ): Promise<FantasyTeamWithDrivers | null> {
    try {
      // Get the fantasy team
      const { data: team, error: teamError } = await supabase
        .from("fantasy_teams")
        .select("*")
        .eq("user_id", userId)
        .eq("year", year)
        .eq("round", round)
        .single();

      if (teamError) {
        if (teamError.code === "PGRST116") {
          // No team found for this user, year, and round
          console.log("No team found for this user, year, and round");
          return null;
        }
        console.error("Error loading fantasy team:", teamError);
        return null;
      }

      // Get the drivers for this team
      const { data: teamDrivers, error: driversError } = await supabase
        .from("fantasy_team_drivers")
        .select("driver_code, driver_cost_at_selection")
        .eq("fantasy_team_id", team.id);

      if (driversError) {
        console.error("Error loading team drivers:", driversError);
        return null;
      }

      // Get the full driver details from the drivers table
      const driverCodes = teamDrivers.map(td => td.driver_code);
      const { data: drivers, error: fullDriversError } = await supabase
        .from("drivers")
        .select("*")
        .in("driver_code", driverCodes);

      if (fullDriversError) {
        console.error("Error loading driver details:", fullDriversError);
        return null;
      }

      // Convert to Driver interface format
      const convertedDrivers: Driver[] = drivers.map(driver => ({
        driverCode: driver.driver_code,
        cost: driver.cost,
        driverName: driver.driver_name,
        teamName: driver.team_name,
        deltaCost: driver.delta_cost,
        driverImage: driver.driver_image || "",
        teamImage: driver.team_image || "",
        colors: { 
          main: driver.color_main, 
          accent: driver.color_accent,
          secondary: driver.color_secondary 
        },
      }));

      return {
        ...team,
        drivers: convertedDrivers,
      };
    } catch (error) {
      console.error("Error loading fantasy:", error);
      return null;
    }
  }

  static async loadAllUserFantasy(userId: string): Promise<FantasyTeamWithDrivers[]> {
    try {
      const { data: teams, error: teamsError } = await supabase
        .from("fantasy_teams")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (teamsError) {
        console.error("Error loading all fantasy teams:", teamsError);
        return [];
      }

      const teamsWithDrivers: FantasyTeamWithDrivers[] = [];

      for (const team of teams || []) {
        const teamWithDrivers = await this.loadFantasy(userId, team.year, team.round);
        if (teamWithDrivers) {
          teamsWithDrivers.push(teamWithDrivers);
        }
      }

      return teamsWithDrivers;
    } catch (error) {
      console.error("Error loading all fantasy:", error);
      return [];
    }
  }

  static async deleteFantasy(userId: string, year: number, round: number): Promise<boolean> {
    try {
      // Get the team ID first
      const { data: team, error: fetchError } = await supabase
        .from("fantasy_teams")
        .select("id")
        .eq("user_id", userId)
        .eq("year", year)
        .eq("round", round)
        .single();

      if (fetchError) {
        if (fetchError.code === "PGRST116") {
          // Team doesn't exist, consider it deleted
          return true;
        }
        console.error("Error fetching team for deletion:", fetchError);
        return false;
      }

      // Delete the team (this will cascade delete the drivers due to foreign key)
      const { error: deleteError } = await supabase
        .from("fantasy_teams")
        .delete()
        .eq("id", team.id);

      if (deleteError) {
        console.error("Error deleting fantasy team:", deleteError);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error deleting fantasy:", error);
      return false;
    }
  }
} 