const arecibodecdrawCanvas = () => {
  var binaryInput = document.getElementById("arecibodecbinaryInput").value;
  var arecibodecwidth = parseInt(
    document.getElementById("arecibodecwidth").value
  );

  var canvas = document.getElementById("arecibodecbinaryCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var chunks = splitString(binaryInput, arecibodecwidth);
  var gridSize = 10;

  var canvasWidth = arecibodecwidth * gridSize;
  var canvasHeight = (binaryInput.length / arecibodecwidth) * gridSize;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.display = "inline-block";

  var x = 0;
  var y = 0;

  for (var i = 0; i < chunks.length; i++) {
    var chunk = chunks[i];
    for (var j = 0; j < chunk.length; j++) {
      var color = chunk[j] === "0" ? "black" : "white";
      ctx.fillStyle = color;
      ctx.fillRect(x, y, gridSize, gridSize);
      x += gridSize;
    }
    x = 0;
    y += gridSize;
  }
};

const splitString = (string, chunkLength) => {
  var result = [];
  for (var i = 0; i < string.length; i += chunkLength) {
    result.push(string.substring(i, i + chunkLength));
  }
  return result;
};

const areciboenccanvas = document.getElementById("areciboenccanvas");
const areciboencencodeBtn = document.getElementById("areciboencencodeBtn");
const areciboencclearBtn = document.getElementById("areciboencclearBtn");

let grid = [];
let height = 0;
let width = 0;
let isDrawing = false;

const createCanvas = () => {
  areciboenccanvas.innerHTML = "";
  grid = [];

  height = parseInt(document.getElementById("areciboencheight").value, 10);
  width = parseInt(document.getElementById("areciboencwidth").value, 10);

  areciboenccanvas.style.width = `${width * 10}px`;
  areciboenccanvas.style.height = `${height * 10}px`;

  for (let i = 0; i < height; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    grid[i] = [];
    for (let j = 0; j < width; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.addEventListener("mousedown", () => {
        isDrawing = true;
      });
      square.addEventListener("mouseup", () => {
        isDrawing = false;
      });
      square.addEventListener("mousemove", (event) => {
        if (isDrawing) {
          toggleSquare(event.target);
        }
      });
      square.addEventListener("click", (event) => {
        if (!isDrawing) {
          toggleSquare(event.target);
        }
      });
      square.addEventListener("contextmenu", (event) => event.preventDefault());
      square.setAttribute("draggable", "false");
      row.appendChild(square);
      grid[i][j] = 0;
    }
    areciboenccanvas.appendChild(row);
  }
};

const toggleSquare = (square) => {
  const rowIndex = Array.from(square.parentNode.parentNode.children).indexOf(
    square.parentNode
  );
  const columnIndex = Array.from(square.parentNode.children).indexOf(square);

  if (event.buttons === 1 || !isDrawing) {
    square.style.backgroundColor = "white";
    grid[rowIndex][columnIndex] = 1;
  } else if (event.buttons === 2) {
    square.style.backgroundColor = "black";
    grid[rowIndex][columnIndex] = 0;
  }
};

const encodeCanvas = () => {
  const encodedCanvas = grid
    .map((row) => row.map((cell) => cell.toString()).join(""))
    .join("");

  document.getElementById("areciboencoutput").value = encodedCanvas;
};

const clearCanvas = () => {
  const squares = document.getElementsByClassName("square");
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = "black";
    const rowIndex = Array.from(
      squares[i].parentNode.parentNode.children
    ).indexOf(squares[i].parentNode);
    const columnIndex = Array.from(squares[i].parentNode.children).indexOf(
      squares[i]
    );
    grid[rowIndex][columnIndex] = 0;
  }
};

document
  .getElementById("areciboencheight")
  .addEventListener("input", createCanvas);
document
  .getElementById("areciboencwidth")
  .addEventListener("input", createCanvas);
areciboencencodeBtn.addEventListener("click", encodeCanvas);
areciboencclearBtn.addEventListener("click", clearCanvas);