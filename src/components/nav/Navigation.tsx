import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const getButtonClasses = (path: string) => {
    const baseClasses =
      "px-4 py-2 rounded-full ring-1 ring-white/10 transition-all duration-200";
    return location.pathname === path
      ? `${baseClasses} bg-delta-active`
      : `${baseClasses} bg-delta-container-bg`;
  };

  return (
    <div className="container mx-auto p-2">
      <p className="font-black text-3xl text-center mb-2">
        <Link
          to={"/"}
          className="bg-gradient-to-r from-[#703DB6] to-[#6B00FF] text-transparent bg-clip-text font-[Unbounded]"
        >
          Delta
        </Link>
      </p>
      <div className="flex flex-row text-xs justify-center gap-2">
        <Link to="/dashboard" className={getButtonClasses("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/fantasy" className={getButtonClasses("/fantasy")}>
          Fantasy
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
