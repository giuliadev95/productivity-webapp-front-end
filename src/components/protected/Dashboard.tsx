import { createClient } from "../../lib/supabase/client";
import { Button } from "../ui/button";

export default function Dashboard() {
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    location.href = "/login";
  };
  return (
    <>
      <h1>This is the dashboard</h1>
      <p>You are logged</p>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}
