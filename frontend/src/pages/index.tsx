import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]); // Ensure data is typed as an array

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  if (!Array.isArray(data)) {
    return <div>Error: Data is not an array</div>;  // Safeguard against unexpected data structure
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.column1}</p>
          <p>{item.column2}</p>
        </div>
      ))}
    </div>
  );
}
