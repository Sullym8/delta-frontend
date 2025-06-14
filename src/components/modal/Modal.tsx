import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative z-50"
            initial={{ scale: 1, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1.3, opacity: 1, rotateY: 0 }}
            exit={{ scale: 1, opacity: 0, rotateY: 180 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.2,
            }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
