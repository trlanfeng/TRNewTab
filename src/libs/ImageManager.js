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
  LoadImage(src, callback) {
    const imageElement = this.GetImageElement();
    imageElement.onload = () => {
      console.log('load finish');
      this.ImageElementList.push(imageElement);
      callback();
    }
    imageElement.src = src;
  }
}

export default ImageManager;
