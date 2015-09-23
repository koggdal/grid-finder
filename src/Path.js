export default class Path {

  constructor() {
    this.indices = {};
  }

  addIndex(index) {
    this.indices[index] = true;
  }

}