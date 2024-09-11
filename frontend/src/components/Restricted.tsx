// pages/Restricted.js
import React, { useEffect, useState, ReactNode } from "react";

interface RestrictedProps {
  children: ReactNode;
}

export default function Restricted({ children }: RestrictedProps) {
  const [isRestricted, setIsRestricted] = useState(false);

  useEffect(() => {
    const checkAspectRatio = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width / height > 3.5) {
        setIsRestricted(true);
      } else {
        setIsRestricted(false);
      }
    };

    checkAspectRatio();

    window.addEventListener("resize", checkAspectRatio);
    return () => {
      window.removeEventListener("resize", checkAspectRatio);
    };
  }, []);

  if (isRestricted) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100 text-center">
        <div>
          <h1 className="text-3xl font-bold text-red-600">Access Restricted</h1>
          <p className="text-lg mt-4">
            Please adjust your browser size to access this content.
          </p>
        </div>
      </div>
    );
  }

  return <div className="">{children}</div>;
}
