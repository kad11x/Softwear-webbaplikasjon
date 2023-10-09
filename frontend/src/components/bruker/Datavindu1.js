import React, { useEffect, useState } from 'react';

const DataVindu1 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Her kan du legge til kode for å hente data fra backenden.
    // For eksempel, hvis du bruker fetch for å hente data fra en API:

    // fetch('/api/data1')
    //   .then((response) => response.json())
    //   .then((data) => setData(data))
    //   .catch((error) => console.error(error));

    // I dette eksemplet antas det at du henter data fra en API og lagrer det i data-tilstanden.
    // Du må tilpasse dette basert på din faktiske backend-implementering.

    // For testing, kan du bruke følgende dummydata:
    const dummyData = [
      { id: 1, name: 'Element 1' },
      { id: 2, name: 'Element 2' },
      { id: 3, name: 'Element 3' },
    ];
    setData(dummyData);
  }, []);

  return (
    <div className="data-window">
      <h2>Data Vindu 1</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataVindu1;
