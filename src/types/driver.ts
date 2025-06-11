interface DriverColors {
    main: string;    // Main team color (e.g., Papaya for McLaren)
    accent: string;     // Accent color for text/highlights
    secondary?: string; // Optional secondary color
}

export interface Driver {
    driverCode: string;
    cost: number;
    driverName: string;
    teamName: string;
    deltaCost: number;
    driverImage: string;
    teamImage: string;
    colors: DriverColors;
}