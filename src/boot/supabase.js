import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/UseAuthUser";

const supabaseUrl = "https://rpocordzymjufwrkitzl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwb2NvcmR6eW1qdWZ3cmtpdHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg0OTE2MTIsImV4cCI6MTk2NDA2NzYxMn0.rP10tij5cLilOyQ7GVAnLCu-x5qq5x2d4nqIpdDtg6c";

const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null;
});

console.log("Init Supase: ", supabase);

export default function useSupabase() {
  return { supabase };
}
