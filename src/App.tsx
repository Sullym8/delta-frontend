import { Route, Routes } from "react-router-dom";
import Navigation from "./components/nav/Navigation";
import Dashboard from "./pages/Dashboard";
import Fantasy from "./pages/Fantasy";
// @ts-expect-error temp
import supabase from "./config/supabase";

function App() {
  console.log(supabase);

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
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
