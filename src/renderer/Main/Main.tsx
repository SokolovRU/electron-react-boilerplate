import React, { useState } from 'react';
import { YMaps, Map, Placemark, Polygon } from '@pbe/react-yandex-maps';

const Main = () => {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };

  const [status, setStatus] = useState<number>(1);
  const [polygonPoints, setPolygonPoints] = useState<any>([]);

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
    switch (status) {
      case 1: {
        return clickWorkingWithPoints(event.get('coords'));
      }
      default: {
        return null;
      }
    }
  };

  // Функция для вычисления площади полигона
  const calculatePolygonArea = (coords: any[]) => {
    let area = 0;
    const numPoints = coords.length;

    if (numPoints > 2) {
      for (let i = 0; i < numPoints; i++) {
        const { 0: xi, 1: yi } = coords[i];
        const { 0: xj, 1: yj } = coords[(i + 1) % numPoints];

        area += xi * yj - xj * yi;
      }
      area = Math.abs(area) / 2;
    }
    return area;
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
      }}
    >
      {/* Блок слева для дополнительной информации */}
      <div style={{ width: '40vh', height: '100vh', backgroundColor: '#000' }}>
        {/* Заголовок */}
        <div>Данные по выделенному объекту</div>
        {/* Тестовое состояние площади */}
        <div>
          <div>Актуальные точки</div>
          <div>
            {polygonPoints.map((item) => {
              return <div>{item}</div>;
            })}
          </div>
          <div>Общая площадь</div>
          <div>{calculatePolygonArea(polygonPoints)}</div>
        </div>
      </div>

      {/* Блок с картой */}
      <div style={{ width: '100vh', height: '100vh' }}>
        <YMaps query={{ apikey: '66e73361-2c34-46a5-8af3-389f14003857' }}>
          <Map
            defaultState={defaultState}
            width="100vh"
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
      </div>
    </div>
  );
};

export default Main;
