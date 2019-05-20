class ImageManager {
  constructor() {
    this.ImageList = [];
    this.ImageElementList = [];
    this.ImageElementList.push(new Image());
  }
  static get Instance() {
    if (!this.instance) this.instance = new ImageManager();
    return this.instance;
  }
  GetImageElement() {
    if (this.ImageElementList[0]) {
      return this.ImageElementList.shift();
    } else {
      return new Image();
    }
  }
  LoadImage(src) {
    const _this = this;
    return new Promise(function (resolve, reject) {
      try {
        const imageElement = _this.GetImageElement();
        imageElement.onload = () => {
          imageElement.src = '';
          imageElement.onload = () => { };
          _this.ImageElementList.push(imageElement);
          resolve();
        }
        imageElement.onerror = (err) => {
          reject(err);
        }
        imageElement.src = src;
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default ImageManager;
