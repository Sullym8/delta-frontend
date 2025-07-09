import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_DELTA_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_DELTA_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
