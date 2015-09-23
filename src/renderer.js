import Path from './Path';

const dpiValue = window.devicePixelRatio || 1;

/**
 * Convert a pixel value to device pixels.
 *
 * @param {number} value The value in "CSS" pixels.
 *
 * @return {number} The value in "device" pixels.
 */
function dpi(value) {
  return dpiValue * value;
}

/**
 * Set the dimensions of the passed canvas.
 * This also takes device pixel ratio into account.
 *
 * @param {HTMLCanvasElement} canvas A canvas element.
 * @param {number} width The width of the canvas in "CSS" pixels.
 * @param {number} height The height of the canvas in "CSS" pixels.
 */
function setDimensions(canvas, width, height) {
  canvas.width = dpi(width);
  canvas.height = dpi(height);
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
}

/**
 * Render the provided map to the canvas.
 *
 * @param {HTMLCanvasElement} canvas A canvas element.
 * @param {Map} map A Map instance.
 * @param {Path} path A Path instance.
 */
function renderMap(canvas, map, path = new Path()) {
  const viewWidth = canvas.width - dpi(100);
  const viewHeight = canvas.height - dpi(100);
  const tileWidth = Math.floor(viewWidth / map.cols);
  const tileHeight = Math.floor(viewHeight / map.rows);
  const tileSize = Math.min(tileWidth, tileHeight);
  const fontSize = Math.max(dpi(8), dpi(tileSize / 8));

  const context = canvas.getContext('2d');

  context.save();
  context.translate(
    (canvas.width - viewWidth) / 2,
    (canvas.height - viewHeight) / 2
  );

  context.lineWidth = dpi(2);
  context.strokeStyle = 'black';
  context.font = fontSize + 'px sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  const mapData = map.data;
  const pathIndices = path.indices;

  for (let i = 0, l = mapData.length; i < l; i++) {
    const tileValue = mapData[i];
    const col = i % map.cols;
    const row = Math.floor(i / map.cols);
    const x = col * tileSize;
    const y = row * tileSize;

    context.beginPath();
    context.rect(x, y, tileSize, tileSize);
    context.closePath();

    context.fillStyle = 'black';

    if (i === map.start || i === map.end) {
      context.fillStyle = 'red';
      context.fill();
      context.fillStyle = 'white';
    }

    if (pathIndices.hasOwnProperty(i)) {
      context.fillStyle = 'lime';
      context.fill();
      context.fillStyle = 'black';
    }

    context.stroke();

    context.fillText(tileValue, x + tileSize / 2, y + tileSize / 2);
  }

  context.restore();
}

export default {
  setDimensions,
  renderMap
};