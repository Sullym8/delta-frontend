import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TbLogout } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { a } from "framer-motion/client";

const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const avatarUrl =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  const getButtonClasses = (path: string) => {
    const baseClasses =
      "px-4 py-2 rounded-full ring-1 ring-white/10 transition-all duration-200";
    return location.pathname === path
      ? `${baseClasses} bg-delta-active`
      : `${baseClasses} bg-delta-container-bg`;
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        avatarRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container mx-auto p-2 mb-1 relative">
      <div className="font-black text-3xl ">
        <p className="text-center mb-2">
          <Link
            to={"/"}
            className="bg-gradient-to-r from-[#703DB6] to-[#6B00FF] text-transparent bg-clip-text font-[Unbounded]"
          >
            Delta
          </Link>
        </p>
      </div>
      {user && (
        <div className="absolute top-4 right-4">
          <div
            ref={avatarRef}
            className="cursor-pointer"
            onClick={() => setShowPopover(!showPopover)}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10 hover:ring-white/30 transition-all"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-delta-active flex items-center justify-center ring-1 ring-white/10 hover:ring-white/30 transition-all">
                <span className="text-xs font-medium">
                  {(
                    user.user_metadata?.name?.[0] ||
                    user.email?.[0] ||
                    "U"
                  ).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          {showPopover && (
            <div
              ref={popoverRef}
              className="absolute top-10 right-0 w-64 bg-delta-container-bg rounded-xl shadow-lg ring-1 ring-white/10 p-3 z-50"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                  <div className="w-10 h-10">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover ring-1 ring-white/10"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-delta-active flex items-center justify-center ring-1 ring-white/10">
                        <span>
                          {(
                            user.user_metadata?.name?.[0] ||
                            user.email?.[0] ||
                            "U"
                          ).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {user.user_metadata?.name || user.email?.split("@")[0]}
                    </p>
                    <p className="text-xs text-white/60">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    signOut();
                    setShowPopover(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm"
                >
                  <TbLogout size={16} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
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
