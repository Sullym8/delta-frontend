import { Route, Routes } from "react-router-dom";
import Navigation from "./components/nav/Navigation";
import Dashboard from "./pages/Dashboard";
import Fantasy from "./pages/Fantasy";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthCallback from "./pages/AuthCallback";
import { Auth } from "@supabase/auth-ui-react";
import supabase from "./config/supabase";
import { ThemeSupa } from "@supabase/auth-ui-shared";

function AuthenticatedApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    );
  }

  return (
    <div className="h-dvh">
      <nav className="w-full">
        <Navigation />
      </nav>
      <main className="h-[calc(100dvh-7rem)]">
        <div className="container mx-auto px-4 h-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/fantasy" element={<Fantasy />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

export default App;
