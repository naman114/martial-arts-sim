const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

const FRAMES = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
};

const imagePath = (animation, frameNumber) =>
  `images/${animation}/${frameNumber}.png`;

const loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img); // This callback is called once the image loads
  img.src = src;
};

const loadImages = (callback) => {
  let loadedImages = { idle: [], kick: [], punch: [] };
  let imagesToLoad = 0;
  ["idle", "kick", "punch"].forEach((animation) => {
    let animationFrames = FRAMES[animation];
    imagesToLoad += FRAMES[animation].length;

    animationFrames.forEach((frameNumber) => {
      let path = imagePath(animation, frameNumber);
      loadImage(path, (img) => {
        loadedImages[animation].push(img);
        imagesToLoad--;
        if (imagesToLoad === 0) callback(loadedImages);
      });
    });
  });
};

const animate = (ctx, images, animationToPlay, callback) => {
  images[animationToPlay].forEach((img, idx) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(img, 0, 0, 500, 500);
    }, idx * 100);
  });
  setTimeout(callback, images[animationToPlay].length * 100);
};

loadImages((images) => {
  console.log(images);
  const queuedAnimations = [];
  let aux = () => {
    let selectedAnimation;
    if (queuedAnimations.length === 0) selectedAnimation = "idle";
    else selectedAnimation = queuedAnimations.shift();
    animate(ctx, images, selectedAnimation, aux);
  };
  aux();
  document.getElementById("kick").onclick = () => queuedAnimations.push("kick");
  document.getElementById("punch").onclick = () =>
    queuedAnimations.push("punch");

  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "ArrowLeft") queuedAnimations.push("kick");
    else if (key === "ArrowRight") queuedAnimations.push("punch");
  });
});
