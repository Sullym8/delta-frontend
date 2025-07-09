import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TbLogout } from "react-icons/tb";

const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const avatarUrl =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  const getButtonClasses = (path: string) => {
    const baseClasses =
      "px-4 py-2 rounded-full ring-1 ring-white/10 transition-all duration-200";
    return location.pathname === path
      ? `${baseClasses} bg-delta-active`
      : `${baseClasses} bg-delta-container-bg`;
  };

  return (
    <div className="container mx-auto p-2 mb-1">
      <div className="flex flex-row items-center justify-between">
        <p className="font-black text-3xl text-center mb-2">
          <Link
            to={"/"}
            className="bg-gradient-to-r from-[#703DB6] to-[#6B00FF] text-transparent bg-clip-text font-[Unbounded]"
          >
            Delta
          </Link>
        </p>
        {user && (
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-delta-active flex items-center justify-center ring-1 ring-white/10">
                  <span className="text-xs font-medium">
                    {(
                      user.user_metadata?.name?.[0] ||
                      user.email?.[0] ||
                      "U"
                    ).toUpperCase()}
                  </span>
                </div>
              )}

              <button
                onClick={signOut}
                className="text-xs text-white/60 hover:text-white p-1.5 rounded-full hover:bg-delta-container-bg transition-all"
              >
                <TbLogout size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
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
