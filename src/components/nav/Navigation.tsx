import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="container mx-auto p-4">
      <p className="font-black text-3xl text-center mb-2">
        <Link to={"/"}>RaceSpace</Link>
      </p>
      <div className="flex flex-row text-xs justify-center gap-2">
        <button className="hover:bg-rs-gray-dark text-white px-4 py-2 rounded-full ring-1 ring-white/10">
          <Link to="/dashboard">Dashboard</Link>
        </button>
        <button className="hover:bg-rs-gray-dark text-white px-4 py-2 rounded-full ring-1 ring-white/10">
          <Link to="/fantasy">Fantasy</Link>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
