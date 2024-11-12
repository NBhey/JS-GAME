// ПЕРЕМЕННЫЕ
let heroImg = document.getElementById("hero-img");
heroImg.onclick = (event) =>{
  event.preventDeafult()
}
let imgBlock = document.getElementById("img-block");
let canvas = document.getElementById("canvas");
let fsButton = document.getElementById("fsButton");
fsButton.onclick = () => {
  if (window.document.fullscreen) {
    fsButton.src = './img/fullscreen.png'
    window.document.exitFullscreen();
  } else {
    fsButton.src = './img/cancel.png'
    canvas.requestFullscreen();
  }
};
let imgBlockPosition = 0;
let rightPosition = 0;
//   ФУНКЦИИ
const rightHandler = () => {
  heroImg.style.transform = "scale(-1,1)";
  rightPosition = rightPosition + 1;
  imgBlockPosition = imgBlockPosition + 1;
  if (rightPosition > 5) {
    rightPosition = 0;
  }
  heroImg.style.left = `-${rightPosition * 288}px`;
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const leftHandler = () => {
  heroImg.style.transform = "scale(1,1)";
  rightPosition = rightPosition + 1;
  imgBlockPosition = imgBlockPosition - 1;
  if (rightPosition > 5) {
    rightPosition = 0;
  }
  heroImg.style.left = `-${rightPosition * 288}px`;
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};
//   ОБРАБОТЧИКИ СОБЫТИЙ
let timer = null;
let x = 0;
let halfWidth = window.screen.width / 2;
let onTouchStart = (event) => {
  clearInterval(timer);
  x = event.type === "mousedown" ? event.screenX : event.touches[0].screenX;
  timer = setInterval(() => {
    x > halfWidth ? rightHandler() : leftHandler();
  }, 130);
};

let onTouchEnd = (event) => {
  clearInterval(timer);
};

window.onmousedown = onTouchStart;
window.ontouchstart = onTouchStart;

window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;
