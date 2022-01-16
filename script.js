const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

const imagePath = (frameNumber) => `images/idle/${frameNumber}.png`;

const loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img); // This callback is called once the image loads
  img.src = src;
};

const loadImages = (callback) => {
  let loadedImages = [];
  [1, 2, 3, 4, 5, 6, 7, 8].forEach((frameNumber) => {
    let path = imagePath(frameNumber);
    loadImage(path, (img) => {
      loadedImages.push(img);
      if (loadedImages.length === 8) callback(loadedImages);
    });
  });
};

const animate = (ctx, images, callback) => {
  images.forEach((img, idx) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(img, 0, 0, 500, 500);
    }, idx * 100);
  });
  setTimeout(callback, images.length * 100);
};

loadImages((images) => {
  animate(ctx, images, () => console.log("Done"));
});
