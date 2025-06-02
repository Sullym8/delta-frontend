import { Route, Routes } from "react-router-dom";
import Navigation from "./components/nav/Navigation";
import Dashboard from "./pages/Dashboard";
import Fantasy from "./pages/Fantasy";
// @ts-expect-error temp
import supabase from "./config/supabase";

function App() {
  console.log(supabase);

  return (
    <div className="">
      <nav className="w-full">
        <Navigation />
      </nav>
      <main>
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/fantasy" element={<Fantasy />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
