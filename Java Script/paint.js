const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const brushWidth = document.querySelector("#brush-width");
const brushSize = document.querySelector("#brush-size");
const brushColor = document.querySelector("#color-picker");
const brush = document.querySelector(".brush");
const eraser = document.querySelector(".eraser");
const clearBtn = document.querySelector(".clear");
const saveBtn = document.querySelector(".save");
const fullWidthBtn = document.querySelector(".full-width");

let isDrawing = false;
let currentWidth = 20;
let currentColor = "";
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", endDraw);
brushWidth.addEventListener("change", () => {
  currentWidth = brushWidth.value;
});
brushColor.addEventListener("change", () => {
  currentColor = brushColor.value;

});

brush.addEventListener("click", () => {
  brush.classList.add("active");
  eraser.classList.remove("active");
  canvas.classList.add("active-brush");
  canvas.classList.remove("active-erase");
  currentColor = brushColor.value;
});
eraser.addEventListener("click", () => {
  eraser.classList.add("active");
  brush.classList.remove("active");
  canvas.classList.add("active-erase");
  currentColor = "#ffff";
});

clearBtn.addEventListener("click", () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});



window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.fillStyle = "#ffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function drawing(e) {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.strokeStyle = `${currentColor}`;
}

function startDraw() {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = currentWidth;
}

function endDraw() {
  isDrawing = false;
}

fullWidthBtn.addEventListener("click", () => {
  container.classList.toggle("active-full");
  container.style.transition = " all 0.5s";
  fullWidthBtn.classList.toggle("full");
});