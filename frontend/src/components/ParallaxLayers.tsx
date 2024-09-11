import React, { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import styles from "../styles/ParallaxLayers.module.css";

const generateRandomValue = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const ParallaxLayers: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [petals, setPetals] = useState<JSX.Element[]>([]);

  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  useEffect(() => {
    const updateAspectRatio = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      setIsPortrait(aspectRatio < 1);
    };

    // Initial check
    updateAspectRatio();

    // Listen for resize events
    window.addEventListener("resize", updateAspectRatio);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateAspectRatio);
    };
  }, []);

  useEffect(() => {
    const createPetal = () => {
      const left = generateRandomValue(-30, 50); // Petals start between 0% and 30% from the left
      const duration = generateRandomValue(10, 40); // Duration between 20s and 40s
      const delay = generateRandomValue(0, 10); // Delay up to 10s

      return (
        <div
          key={Math.random()}
          className={`${styles.petal} bg-[#6da38c] w-[1.5vw] h-[1.5vw] rounded-full opacity-70 shadow-[0_0_10px_5px_rgba(129,150,193,0.8)]`}
          style={{
            left: `${left}%`,
            top: `-30px`, // Start slightly above the viewport
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            position: "absolute",
          }}
        ></div>
      );
    };

    const generatePetals = () => {
      const newPetals = Array.from({ length: 20 }).map(() => createPetal());
      setPetals(newPetals);
    };

    generatePetals();
  }, []);

  return (
    <ParallaxProvider>
      <div className={styles.parallaxContainer}>
        <div>
          <Parallax className={styles.layer} speed={5}>
            <img
              ref={imageRef}
              src="/layers/background.png"
              alt="Background"
              className={styles.image}
            />
          </Parallax>
          <Parallax className={styles.layer} speed={10}>
            <img
              src="/layers/mountain.png"
              alt="Mountain"
              className={styles.image}
            />
          </Parallax>
          <Parallax className={styles.layer} speed={15}>
            <img src="/layers/tree.png" alt="Tree" className={styles.image} />
          </Parallax>
          <Parallax className={styles.layer} speed={20}>
            <img src="/layers/hill.png" alt="Hill" className={styles.image} />
          </Parallax>
          <Parallax
            className={`${styles.layer} ${styles.responsiveText4_3}`}
            speed={25}
          >
            {/* need to adjust these based on screen size */}
            {isPortrait ? (
              <div
                className={`absolute bottom-[25%] right-[5%] flex flex-col items-end ${styles.responsiveText4_3}`}
              >
                <div
                  className={`font-bold text-[2vh] text-[#ffffff] mb-[-1vh] mr-[.2vw] ${styles.responsiveText4_3} font-open-sans`}
                  style={{ textShadow: "2px 2px 0 #000000" }}
                >
                  Hello, I'm
                </div>
                <div
                  className={`font-extrabold text-[5.5vh] text-[#ffffff] ${styles.responsiveText4_3} font-nunito text-end`}
                  style={{ textShadow: "2px 2px 0 #000000" }}
                >
                  Jessica Chen
                </div>
              </div>
            ) : (
              <div
                className={`absolute bottom-[25%] right-[5%] flex flex-col items-end ${styles.responsiveText4_3}`}
              >
                <div
                  className={`font-bold text-[1.5vw] text-[#ffffff] mb-[-1vh] mr-[.2vw] ${styles.responsiveText4_3} font-open-sans`}
                  style={{ textShadow: "2px 2px 0 #000000" }}
                >
                  Hello, I'm
                </div>
                <div
                  className={`font-extrabold text-[5vw] text-[#ffffff] ${styles.responsiveText4_3} font-nunito`}
                  style={{ textShadow: "2px 2px 0 #000000" }}
                >
                  Jessica Chen
                </div>
              </div>
            )}
          </Parallax>
          <Parallax className={styles.layer} speed={30}>
            <img
              src={
                isPortrait ? "/layers/mound_portrait.png" : "/layers/mound.png"
              }
              alt="Mound"
              className={styles.image}
            />
          </Parallax>
          <Parallax className={`${styles.layer} ${styles.front}`} speed={55}>
            <div className="flex flex-col">
              <img
                src="/layers/front_rocks.png"
                alt="Front Rocks"
                className={styles.image}
              />
              <div className="w-[100vw] h-[1400px] bg-[#121212]"></div>
            </div>
          </Parallax>
        </div>
        {petals}
      </div>
    </ParallaxProvider>
  );
};

export default ParallaxLayers;
