import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "motion/react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  symbol?: string;
}

export function WordsPullUp({ text, className = "", showAsterisk = false, symbol = "*" }: WordsPullUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {words.map((word, idx) => {
        const isLastWord = idx === words.length - 1;
        return (
          <motion.span
            key={idx}
            variants={childVariants}
            className="inline-block mr-[0.25em] relative whitespace-nowrap"
          >
            {word}
            {isLastWord && showAsterisk && (
              <sup 
                className="absolute text-primary" 
                style={{ 
                  fontSize: '0.31em', 
                  top: '0.05em', 
                  right: '-0.32em',
                  lineHeight: 1
                }}
              >
                {symbol}
              </sup>
            )}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

export interface TextSegment {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className = "" }: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  // Flatten segments into a simple word list while preserving style classes and inline CSS
  const wordsList: { word: string; className: string; style?: React.CSSProperties }[] = [];
  segments.forEach((seg) => {
    const words = seg.text.split(" ");
    words.forEach((w) => {
      if (w.trim() !== "") {
        wordsList.push({
          word: w,
          className: seg.className || "",
          style: seg.style,
        });
      }
    });
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {wordsList.map((item, idx) => (
        <motion.span
          key={idx}
          variants={childVariants}
          className={`inline-block mr-[0.25em] ${item.className}`}
          style={item.style}
        >
          {item.word}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface AboutScrollRevealProps {
  text: string;
  className?: string;
}

export function AboutScrollReveal({ text, className = "" }: AboutScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const chars = text.split("");
  const total = chars.length;

  return (
    <div ref={containerRef} className={`${className} relative py-4`}>
      <p className="inline-flex flex-wrap justify-center text-center">
        {chars.map((char, index) => (
          <Character
            key={index}
            char={char}
            index={index}
            total={total}
            progress={scrollYProgress}
          />
        ))}
      </p>
    </div>
  );
}

interface CharacterProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  key?: React.Key;
}

function Character({ char, index, total, progress }: CharacterProps) {
  const charProgress = index / total;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);

  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="relative select-none inline-block">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

interface StaggeredCardProps {
  children: React.ReactNode;
  delayIndex: number;
}

export function StaggeredCard({ children, delayIndex }: StaggeredCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.8,
        delay: delayIndex * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="h-full flex flex-col"
    >
      {children}
    </motion.div>
  );
}
