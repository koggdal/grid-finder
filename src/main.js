import renderer from './renderer';
import pathfinder from './pathfinder';
import getMap from './getMap';

const canvas = document.getElementById('canvas');
const map = getMap();

renderer.setDimensions(canvas, window.innerWidth, window.innerHeight);
renderer.renderMap(canvas, map);

const path = pathfinder.findPath(map);

renderer.renderMap(canvas, map, path);