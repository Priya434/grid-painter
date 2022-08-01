/*

Task: correct the functionality of the erasor button
Pen color picker value should not change

*/

const DEFAULT_GRIDS_SIZE = 16;

let currentGridsSize = DEFAULT_GRIDS_SIZE;

const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");
const grids = document.querySelector("#grids");
const buttons = document.querySelectorAll("button");
const penColorPicker = document.querySelector("#pen-color-picker");
const bgColorPicker = document.querySelector("#bg-color-picker");
const reloader = document.querySelector("#reloader");
const eraser = document.querySelector("#eraser");
const painter = document.querySelector("#painter");
const randomizer = document.querySelector("#randomizer");

// const penColorButton = document.querySelector('#pen-color-button');
// const bgColorButton = document.querySelector('#bg-color-button');

/*..........Event Listeners..........*/

//single event listeners
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

bgColorPicker.oninput = reloadGrids;
reloader.addEventListener("click", reloadGrids);
eraser.addEventListener("click", erase);
painter.addEventListener("click", paint);
randomizer.addEventListener("click", randomPaint);
// eraser.onmouseover = erase;
// eraser.addEventListener('mousedown', erase);
// eraser.addEventListener('mousemove', erase);

//add event listeners

// event listener for slider
slider.addEventListener("input", changeGridsSize);

//function to change grids size
function changeGridsSize(event) {
  setCurrentGridsSize(event);
  sliderValueOutput(currentGridsSize);
  resetGrids();
}

// function for changing grid size value
function setCurrentGridsSize(event) {
  currentGridsSize = event.target.value;
}

// function for showing slider value
function sliderValueOutput(size) {
  sliderValue.textContent = `${size} x ${size}`;
}

// function for reloading the grids layout
function resetGrids() {
  removeGridCells();
  addGridCells(currentGridsSize);
  gridCellsColor();
}

// function for removing grid cells in sketch area
function removeGridCells() {
  while (grids.firstChild) {
    grids.firstChild.remove();
  }
}

// function for adding grid cells in sketch area
function addGridCells(size) {
  grids.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grids.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size ** 2; i++) {
    const gridsCell = document.createElement("div");
    gridsCell.classList.add("grids-cell");
    grids.appendChild(gridsCell);
  }
}

// function for keeping the bg color on changing grid size
function gridCellsColor() {
  const gridsCell = document.querySelectorAll(".grids-cell");
  gridsCell.forEach((cell) => {
    cell.style.backgroundColor = bgColorPicker.value;
  });
}

/*..................................................*/


// reloading the grids
function reloadGrids() {
  const gridsCell = document.querySelectorAll(".grids-cell");
  gridsCell.forEach((cell) => {
    cell.style.backgroundColor = bgColorPicker.value;
  });
  painter.focus();
}

//paint button
function paint() {
  const gridsCell = document.querySelectorAll(".grids-cell");
  gridsCell.forEach((cell) => {
    cell.addEventListener("mousedown", painting);
    cell.addEventListener("mousemove", painting);
    function painting(event) {
      if (event.type === "mousemove" && !mouseDown) return;
      {
        event.target.style.backgroundColor = penColorPicker.value;
      }
    }
  });
}

// random paint
function randomPaint() {
  const gridsCell = document.querySelectorAll(".grids-cell");
  gridsCell.forEach((cell) => {
    cell.addEventListener("mousedown", painting);
    cell.addEventListener("mousemove", painting);
    function painting(event) {
      if (event.type === "mousemove" && !mouseDown) return;
      {
        event.target.style.backgroundColor = `rgb(${Math.random() * 256}, ${Math.random() * 256
          }, ${Math.random() * 256})`;
      }
    }
  });
}

// eraser button
function erase() {
  const gridsCell = document.querySelectorAll(".grids-cell");
  gridsCell.forEach((cell) => {
    cell.addEventListener("mousedown", erasing);
    cell.addEventListener("mousemove", erasing);
    function erasing(event) {
      if (event.type === "mousemove" && !mouseDown) return;
      {
        event.target.style.backgroundColor = bgColorPicker.value;
      }
    }
  });
}

/*.................................................*/

// operations to perform when web page loads
window.onload = () => {
  sliderValueOutput(DEFAULT_GRIDS_SIZE);
  addGridCells(DEFAULT_GRIDS_SIZE);
  paint();
  painter.focus();
};
