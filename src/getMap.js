import Map from './Map';

export default function getMap() {
  const map = new Map();

  map.rows = 5;
  map.cols = 5;

  map.data = [
    1, 3, 2, 5, 9,
    6, 5, 1, 3, 3,
    4, 2, 1, 4, 5,
    8, 2, 8, 4, 1,
    7, 1, 2, 2, 3
  ];

  map.start = 0;
  map.end = map.data.length - 1;

  return map;
};
