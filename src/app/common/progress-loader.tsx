'use client'
import React, { useEffect, useState } from 'react';

const ProgressLoader: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const radius = 50; // Radius of the circle
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const progressOffset = circumference - (scrollProgress / 100) * circumference; // Calculate offset for progress


    return (
        <div style={{ zIndex: 9999 }}>
          <svg
            width="56"
            height="56"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "rotate(-90deg)" }} // Rotate to start progress from the top
          >
            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="#F1F6FC"
              stroke="#F1F6FC"
              strokeWidth="6"
            />
            {/* Progress Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#004BDE"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.2s ease-out",
              }}
            />
          </svg>

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img src='../assets/icons/arrow-up.svg' />
            {/* {Math.round(scrollProgress)}% */}
          </div>
        </div>
    )
}

export default ProgressLoader