import { motion } from "framer-motion";
import { useState } from "react";

interface CardStackProps {
  cards: React.ReactNode[];
  initialIndex?: number;
}

const CardStack = ({ cards, initialIndex = 0 }: CardStackProps) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = async (_: unknown, info: any) => {
    const threshold = 5; // minimum distance for swipe
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (Math.abs(velocity) > 500 || Math.abs(offset) > threshold) {
      const direction = velocity < 0 || offset < 0 ? 1 : -1;
      const newIndex = Math.min(
        Math.max(selectedIndex + direction, 0),
        cards.length - 1
      );
      setSelectedIndex(newIndex);
    }
  };

  return (
    <div className="relative h-[350px] w-[250px]">
      {cards.map((card, index) => {
        const offset = index - selectedIndex;
        const isSelected = index === selectedIndex;

        return (
          Math.abs(offset) < 4 && (
            <motion.div
              key={index}
              className="absolute w-full h-full origin-bottom"
              animate={{
                scale: 1 - Math.abs(offset) * 0.1,
                filter: `brightness(${
                  isSelected ? 1 : 0.8 - Math.abs(offset) * 0.1
                })`,
                rotateZ: offset * 5,
                x: offset * 10,
                y: Math.abs(offset) * -10,
                zIndex: cards.length - Math.abs(offset),
              }}
              drag={isSelected ? "x" : false}
              dragConstraints={{
                left: index === cards.length - 1 ? 0 : -50,
                right: index === 0 ? 0 : 50,
              }}
              dragElastic={{
                left: index === cards.length - 1 ? 0 : 0.5,
                right: index === 0 ? 0 : 0.5,
              }}
              dragMomentum={false}
              whileDrag={{ scale: 0.95 }}
              onDragEnd={isSelected ? handleDragEnd : undefined}
              transition={{
                type: "spring",
                bounce: 0,
                stiffness: 300,
                damping: 30,
              }}
            >
              {card}
            </motion.div>
          )
        );
      })}

      <div className="absolute -bottom-0 left-0 right-0 flex justify-center gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors
              ${index === selectedIndex ? "bg-purple-500" : "bg-white/30"}`}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardStack;
