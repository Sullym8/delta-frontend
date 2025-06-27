import { motion, PanInfo } from "framer-motion";
import React, { useEffect, useState } from "react";

interface BottomSheetProps {
  children?: React.ReactNode;
  baseHeightRatio: number;
  expandedHeightRatio: number;
  externalIsExpanded?: boolean;
  onExpandChange?: (isExpanded: boolean) => void;
}

const BottomSheet = ({
  children,
  baseHeightRatio,
  expandedHeightRatio,
  externalIsExpanded = false,
  onExpandChange,
}: BottomSheetProps) => {
  const [isExpanded, setIsExpanded] = useState(externalIsExpanded);

  useEffect(() => {
    setIsExpanded(externalIsExpanded);
  }, [externalIsExpanded]);

  const halfHeight = window.innerHeight * baseHeightRatio;
  const expandedHeight = window.innerHeight * expandedHeightRatio;

  const handleDragEnd = (_: never, info: PanInfo) => {
    const draggedUp = info.offset.y < 0;
    setIsExpanded(draggedUp);
    onExpandChange?.(draggedUp);
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-delta-container-bg rounded-t-3xl ring-1 ring-white/10 z-50"
      animate={{
        height: isExpanded ? expandedHeight : halfHeight,
      }}
      initial={{ height: halfHeight }}
      transition={{
        type: "spring",
        damping: 30,
        bounce: 0,
        stiffness: 300,
      }}
    >
      <motion.div
        className="cursor-grab active:cursor-grabbing"
        drag="y"
        dragDirectionLock
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        <div className="w-full flex justify-center p-4">
          <div className="w-12 h-1 bg-white/20 rounded-full" />
        </div>
      </motion.div>
      <div
        className="w-full overflow-y-scroll px-4"
        style={{ height: "calc(100% - 48px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default BottomSheet;
