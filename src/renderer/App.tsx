import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

import React, { useState } from 'react';
import { YMaps, Map, Placemark, Polygon } from '@pbe/react-yandex-maps';
import Main from './Main/Main';

// export default function App() {
//   const defaultState = {
//     center: [55.751574, 37.573856],
//     zoom: 5,
//   };

//   return (
//     <YMaps query={{apikey: '66e73361-2c34-46a5-8af3-389f14003857'}}>
//       <Map defaultState={defaultState} width={500} height={500}>
//         <Placemark geometry={[55.684758, 37.738521]} />
//       </Map>
//     </YMaps>
//   );
// }

function Hello() {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 15,
  };

  const [status, setStatus] = useState<number>(1); // TODO: пожалуйста, потом распиши статусы словами а не цифрами нахуй

  const [polygonPoints, setPolygonPoints] = useState<any>([]);

  // TODO: сделать что клин по той же клетке удаляет ее
  const clickWorkingWithPoints = (coords: any) => {
    if (polygonPoints.length === 0) {
      setPolygonPoints([coords]);
    } else {
      setPolygonPoints([...polygonPoints, coords]);
    }
  };

  const clickOnPlacemarkWorkingWithPoints = (id: number) => {
    const updatedPoints = polygonPoints.filter((_, index) => index !== id);
    setPolygonPoints(updatedPoints);
  };

  const onClick = (event?: any) => {
    console.log('clock');
    switch (status) {
      case 1: {
        return clickWorkingWithPoints(event.get('coords'));
      }
      default: {
        return null;
      }
    }
  };

  return (
    <YMaps query={{ apikey: '66e73361-2c34-46a5-8af3-389f14003857' }}>
      <Map
        defaultState={defaultState}
        width="100vw"
        height="100vh"
        onClick={(event) => onClick(event)}
      >
        {polygonPoints.map((item, id) => {
          return (
            <Placemark
              geometry={item}
              key={id}
              onClick={() => clickOnPlacemarkWorkingWithPoints(id)}
            />
          );
        })}
        <Polygon geometry={[polygonPoints]} />
      </Map>
    </YMaps>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
