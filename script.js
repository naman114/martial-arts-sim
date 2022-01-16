const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

const imagePath = (frameNumber, animation) =>
  `images/${animation}/${frameNumber}.png`;

const loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img); // This callback is called once the image loads
  img.src = src;
};

const loadImages = (imageIndex, animation, callback) => {
  let loadedImages = [];
  imageIndex.forEach((frameNumber) => {
    let path = imagePath(frameNumber, animation);
    loadImage(path, (img) => {
      loadedImages.push(img);
      if (loadedImages.length === imageIndex.length) callback(loadedImages);
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

loadImages([1, 2, 3, 4, 5, 6, 7], "idle", (images) => {
  animate(ctx, images, () => console.log("Idle Done"));
});

document.getElementById("kick").addEventListener("click", () => {
  console.log("kick");
  loadImages([1, 2, 3, 4, 5, 6, 7], "kick", (images) => {
    animate(ctx, images, () => console.log("Kick Done"));
  });
});
document.getElementById("punch").addEventListener("click", () => {
  console.log("punch");
  loadImages([1, 2, 3, 4, 5, 6, 7], "punch", (images) => {
    animate(ctx, images, () => console.log("Punch Done"));
  });
});
