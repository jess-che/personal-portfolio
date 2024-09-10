import React, { useRef, useEffect, useState } from 'react';
import ParallaxComponent from '../components/ParallaxLayers';
import CursorTrail from '../components/CursorTrail';
import Restricted from '../components/Restricted';
import styles from '../styles/ParallaxLayers.module.css';

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const frontRocksRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const handleScroll = () => {
      if (frontRocksRef.current && contentRef.current) {
        const scrollY = window.scrollY;
        const yOffset = scrollY * -.40;
        frontRocksRef.current.style.transform = `translateY(${yOffset}px)`;
        contentRef.current.style.transform = `translateY(${yOffset}px)`;
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
    <>
      <Restricted>
        <><CursorTrail/>
      <div className="flex flex-col">
        <div ref={parallaxRef}>
          <ParallaxComponent />
        </div>
        <div
          ref={frontRocksRef}
          className={`${styles.layer}`}
          style={{ transform: 'translateY(0px)' }}
        >
          <img
            src="/layers/front_rocks.png"
            alt="Front Rocks"
            className={`${styles.image}`}
          />
        </div>
        {/* eventually take out height and put all teh contents in here */}
        <div
          ref={contentRef}
          className="flex flex-col w-[100vw] h-[100vh] bg-[#121212]"
          style={{ transform: 'translateY(0px)' }}
        ></div>
      </div></>
      </Restricted>
      
    </>
  );
}






// import React, { useRef, useEffect, useState } from 'react';

// export default function Home() {
//   // const [data, setData] = useState<any[]>([]); // Ensure data is typed as an array

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     const response = await fetch('/api/data');
//   //     const result = await response.json();
//   //     setData(result);
//   //   }
//   //   fetchData();
//   // }, []);


//   return (
//     // <div>
//     //   {data.map((item) => (
//     //     <div key={item.id}>
//     //       <p>{item.column1}</p>
//     //       <p>{item.column2}</p>
//     //     </div>
//     //   ))}
//     // </div>

//   );
// }
