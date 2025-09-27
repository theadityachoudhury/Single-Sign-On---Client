"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import type { LoadingBarProps } from "~/types";

interface LoadingBarComponentProps extends LoadingBarProps {
  isVisible: boolean;
  progress?: number;
}

export function LoadingBar({ 
  isVisible, 
  progress = 0, 
  className, 
  duration = 2000 
}: LoadingBarComponentProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "fixed top-0 left-0 right-0 z-50 h-1",
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-full bg-gray-200 dark:bg-gray-800">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
              initial={{ width: "0%" }}
              animate={{ 
                width: progress > 0 ? `${progress}%` : "100%"
              }}
              transition={{
                duration: progress > 0 ? 0.3 : duration / 1000,
                ease: progress > 0 ? "easeOut" : "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SimpleLoadingBar({ 
  isVisible, 
  className 
}: { 
  isVisible: boolean; 
  className?: string; 
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-500 to-purple-600",
            className
          )}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0, transformOrigin: "right" }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
        />
      )}
    </AnimatePresence>
  );
}

export function PulseLoadingBar({ 
  isVisible, 
  className 
}: { 
  isVisible: boolean; 
  className?: string; 
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "fixed top-0 left-0 right-0 z-50 h-1",
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%]"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}