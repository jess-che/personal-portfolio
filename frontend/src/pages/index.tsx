import React, { useRef, useEffect, useState } from "react";
import ParallaxComponent from "../components/ParallaxLayers";
import CursorTrail from "../components/CursorTrail";
import Restricted from "../components/Restricted";
import styles from "../styles/ParallaxLayers.module.css";

export default function Home() {
  const profilePicRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const [profilePicHeight, setProfilePicHeight] = useState<number | string>(
    "auto"
  );
  const [aboutMeHeight, setAboutMeHeight] = useState<number | string>("auto");

  useEffect(() => {
    const updateHeights = () => {
      if (aboutMeRef.current && profilePicRef.current) {
        const currentHeight = aboutMeRef.current.offsetHeight;
        const additionalHeight = 20; // Adjust this value as needed
  
        setAboutMeHeight(currentHeight);
        setProfilePicHeight(currentHeight + additionalHeight);
      }
    };
  
    // Call updateHeights once on component mount
    updateHeights();
  
    // Add event listener to handle window resize
    window.addEventListener('resize', updateHeights);
  
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateHeights);
    };
  }, [aboutMeRef, profilePicRef]);

  return (
    <>
      <Restricted>
        <>
          <CursorTrail />
          <div className="flex flex-col">
            <ParallaxComponent />
            <>
              <div className="flex flex-col w-[100vw] bg-[#121212] pt-[20px] pb-[60px]">
                {/* about me */}
                <div className="w-[100%]">
                  <div
                    className="flex flex-row items-center justify-center w-[100%] bg-[#2F2F2F] "
                    style={{ height: aboutMeHeight }}
                  >
                    <div
                      ref={profilePicRef}
                      className="w-[20px] bg-red-400 mr-[20px]"
                      style={{ height: profilePicHeight }}
                    ></div>
                    <div ref={aboutMeRef} className="ml-[20px] py-[20px] flex flex-col w-[50%]">
                      <div>About me</div>
                      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </>
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
