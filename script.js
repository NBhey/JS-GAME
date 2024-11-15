// ПЕРЕМЕННЫЕ
let jumpBlock = document.getElementById("jump-block");
jumpBlock.style.top = `${window.screen.height / 2 - 144 / 2}`;

let hitBlock = document.getElementById("hit-block");
hitBlock.style.top = `${window.screen.height / 2 - 144 / 2}`;

let heroImg = document.getElementById("hero-img");
heroImg.onclick = (event) => {
  event.preventDeafult();
};
let imgBlock = document.getElementById("img-block");
let canvas = document.getElementById("canvas");
let fsButton = document.getElementById("fsButton");
fsButton.onclick = () => {
  if (window.document.fullscreen) {
    fsButton.src = "./img/fullscreen.png";
    window.document.exitFullscreen();
  } else {
    fsButton.src = "./img/cancel.png";
    canvas.requestFullscreen();
  }
};

jumpBlock.onclick = () => {
  jump = true;
};
hitBlock.onclick = () => {
  hit = true;
};
let imgBlockPosition = 0;
let rightPosition = 0;
let direction = "right";
let hit = false;
let jump = false;
//   ФУНКЦИИ
const rightHandler = () => {
  heroImg.style.transform = "scale(-1,1)";
  rightPosition = rightPosition + 1;
  imgBlockPosition = imgBlockPosition + 1;
  if (rightPosition > 5) {
    rightPosition = 0;
  }
  heroImg.style.left = `-${rightPosition * 96}px`;
  heroImg.style.top = "-192px";
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const leftHandler = () => {
  heroImg.style.transform = "scale(1,1)";
  rightPosition = rightPosition + 1;
  imgBlockPosition = imgBlockPosition - 1;
  if (rightPosition > 5) {
    rightPosition = 0;
  }
  heroImg.style.left = `-${rightPosition * 96}px`;
  heroImg.style.top = "-192px";
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const standHandler = () => {
  heroImg.style.transform = "scale(-1,1)";
  if (rightPosition > 4) {
    rightPosition = 1;
  }

  switch (direction) {
    case "right": {
      heroImg.style.transform = "scale(-1,1)";
      if (rightPosition > 4) {
        rightPosition = 1;
      }
      break;
    }
    case "left": {
      heroImg.style.transform = "scale(1,1)";
      if (rightPosition > 3) {
        rightPosition = 0;
      }
      break;
    }
    default:
      break;
  }
  rightPosition = rightPosition + 1;
  heroImg.style.left = `-${rightPosition * 96}px`;
  heroImg.style.top = "0px";
};
const hitHandler = ()=>{
  heroImg.style.transform = "scale(-1,1)";
  if (rightPosition > 4) {
    rightPosition = 1;
  }

  switch (direction) {
    case "right": {
      heroImg.style.transform = "scale(-1,1)";
      if (rightPosition > 4) {
        rightPosition = 1;
        jump = false;
      }
      break;
    }
    case "left": {
      heroImg.style.transform = "scale(1,1)";
      if (rightPosition > 3) {
        rightPosition = 0;
        jump = false;
      }
      break;
    }
    default:
      break;
  }
  rightPosition = rightPosition + 1;
  heroImg.style.left = `-${rightPosition * 288}px`;
  heroImg.style.top = "-288px";
}
const jumpHandler = ()=>{
  heroImg.style.transform = "scale(-1,1)";
  if (rightPosition > 4) {
    rightPosition = 1;
  }

  switch (direction) {
    case "right": {
      heroImg.style.transform = "scale(-1,1)";
      if (rightPosition > 4) {
        rightPosition = 1;
        hit = false;
      }
      break;
    }
    case "left": {
      heroImg.style.transform = "scale(1,1)";
      if (rightPosition > 3) {
        rightPosition = 0;
        hit = false;
      }
      break;
    }
    default:
      break;
  }
  rightPosition = rightPosition + 1;
  heroImg.style.left = `-${rightPosition * 288}px`;
  heroImg.style.top = "-864px";
}
//   ОБРАБОТЧИКИ СОБЫТИЙ
let timer = null;

let x = 0;
let halfWidth = window.screen.width / 2;

let onTouchStart = (event) => {
  clearInterval(timer);
  x = event.type === "mousedown" ? event.screenX : event.touches[0].screenX;
  timer = setInterval(() => {
    if (x > halfWidth) {
      direction = "right";
      rightHandler();
    } else {
      direction = "left";
      leftHandler();
    }
  }, 100);
};

let onTouchEnd = (event) => {
  clearInterval(timer);
  lifeCycle();
};

window.onmousedown = onTouchStart;
window.ontouchstart = onTouchStart;

window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;

const addTiles = (i) => {
  let tile = document.createElement("img");
  let tileBlack = document.createElement("img");
  tile.src = "/assets/1 Tiles/Tile_02.png";
  tile.style.position = "absolute";
  tile.style.left = `${i * 32}px`;
  tile.style.bottom = "32px";
  tileBlack.src = "/assets/1 Tiles/Tile_04.png";
  tileBlack.style.position = "absolute";
  tileBlack.style.left = `${i * 32}px`;
  tileBlack.style.bottom = 0;
  canvas.appendChild(tile);
  canvas.appendChild(tileBlack);
};
const lifeCycle = () => {
  timer = setInterval(() => {
    if (hit){
      hitHandler()
    } else if(jump){
      jumpHandler()
    } else {
      standHandler();
    }
    
  }, 150);
};
const start = () => {
  lifeCycle();
  for (let i = 0; i < 58; i += 1) {
    addTiles(i);
  }
};
start();
