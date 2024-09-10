import React, { useEffect, useRef, useState } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import styles from '../styles/ParallaxLayers.module.css';

const generateRandomValue = (min: number, max: number) => Math.random() * (max - min) + min;

const ParallaxLayers: React.FC = () => {
  const [blockingLayerStyle, setBlockingLayerStyle] = useState({});
  const imageRef = useRef<HTMLImageElement>(null);
  const [petals, setPetals] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const updateBlockingLayerStyle = () => {
      if (imageRef.current) {
        const imageHeight = imageRef.current.clientHeight;
        setBlockingLayerStyle({
          top: `${imageHeight}px`,
          height: `calc(100vh - ${imageHeight}px + 20px)`,
        });
      }
    };

    updateBlockingLayerStyle();

    window.addEventListener('resize', updateBlockingLayerStyle);
    return () => window.removeEventListener('resize', updateBlockingLayerStyle);
  }, []);

  useEffect(() => {
    const createPetal = () => {
      const left = generateRandomValue(-30, 50); // Petals start between 0% and 30% from the left
      const duration = generateRandomValue(10, 40); // Duration between 20s and 40s
      const delay = generateRandomValue(0, 10); // Delay up to 10s
    
      return (
        <div
          key={Math.random()}
          className={`${styles.petal} bg-[#6da38c] w-4 h-4 rounded-full opacity-70 shadow-[0_0_10px_5px_rgba(129,150,193,0.8)]`}
          style={{
            left: `${left}%`,
            top: `-30px`, // Start slightly above the viewport
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            position: 'absolute',
            zIndex: 100,
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
            <img ref={imageRef} src="/layers/background.png" alt="Background" className={styles.image} />
          </Parallax>
          <Parallax className={styles.layer} speed={10}>
            <img src="/layers/mountain.png" alt="Mountain" className={styles.image} />
          </Parallax>
          <Parallax className={styles.layer} speed={15}>
            <img src="/layers/tree.png" alt="Tree" className={styles.image} />
          </Parallax>
          <Parallax className={styles.layer} speed={20}>
            <img src="/layers/hill.png" alt="Hill" className={styles.image} />
          </Parallax>
          <Parallax className={styles.layer} speed={25}>
            <img src="/layers/mound.png" alt="Mound" className={styles.image} />
          </Parallax>
          <Parallax className={styles.layer} speed={32}>
            <div className={styles.blockingLayer} style={blockingLayerStyle}></div>
          </Parallax>
        </div>
        {petals}
      </div>
    </ParallaxProvider>
  );
};

export default ParallaxLayers;
