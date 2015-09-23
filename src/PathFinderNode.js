export default class PathFinderNode {

  constructor(index = 0, parent = null) {
    this.index = index;
    this.parent = parent;
    this.gCost = 0;
    this.hCost = 0;
    this.fCost = 0;
  }

  calcGCost(map, parent = null) {
    parent = parent || this.parent;

    const parentCost = parent ? parent.gCost : 0;
    const valueFactor = map.data[this.index] || 1;

    let isDiagonal = false;
    if (parent) {
      const col = this.index % map.cols;
      const row = Math.floor(this.index / map.cols);
      const parentCol = parent.index % map.cols;
      const parentRow = Math.floor(parent.index / map.cols);
      if (col !== parentCol && row !== parentRow) {
        isDiagonal = true;
      }
    }

    const gCost = isDiagonal ? Infinity : 10 * valueFactor;

    return parentCost + gCost;
  }

  calcHCost(map) {
    const col = this.index % map.cols;
    const row = Math.floor(this.index / map.cols);
    const endCol = map.end % map.cols;
    const endRow = Math.floor(map.end / map.cols);

    const diffCols = Math.abs(endCol - col);
    const diffRows = Math.abs(endRow - row);

    return diffCols + diffRows;
  }

  setGCost(map) {
    this.gCost = this.calcGCost(map);
    this.setFCost();
  }

  setHCost(map) {
    this.hCost = this.calcHCost(map);
    this.setFCost();
  }

  setFCost() {
    this.fCost = this.gCost + this.hCost;
  }

  calcFCostWithParent(map, parentNode) {
    const gCost = this.calcGCost(map, parentNode);
    const hCost = this.calcHCost(map);
    return gCost + hCost;
  }

}