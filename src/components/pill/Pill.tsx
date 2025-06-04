interface PillProps {
  text?: string;
  icon?: React.ReactNode;
  radius?: "xl" | "2xl" | "full";
  textColor?: string;
  backgroundColor?: string;
  paddingScale?: number;
  onClick?: () => void;
}

const Pill = ({
  text,
  icon,
  radius = "xl",
  textColor = "text-white",
  backgroundColor = "bg-delta-active",
  paddingScale = 1,
  onClick,
}: PillProps) => {
  const getPaddingClasses = (scale: number) => {
    switch (scale) {
      case 1:
        return "px-2 py-1";
      case 2:
        return "px-4 py-2";
      case 3:
        return "px-6 py-3";
      default:
        return "px-2 py-1";
    }
  };

  const getRadiusClass = (r: string) => {
    switch (r) {
      case "xl":
        return "rounded-xl";
      case "2xl":
        return "rounded-2xl";
      case "full":
        return "rounded-full";
      default:
        return "rounded-xl";
    }
  };
  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center gap-2 ${getPaddingClasses(
          paddingScale
        )} ring-1 ring-white/10 ${getRadiusClass(
          radius
        )} ${textColor} ${backgroundColor}`}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {text && <span className="text-sm font-bold">{text}</span>}
      </button>
    </div>
  );
};

export default Pill;
