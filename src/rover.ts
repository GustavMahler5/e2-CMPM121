export {};

const canvas = document.querySelector<HTMLCanvasElement>("#rover-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>("#rover-readout")!;

const headings = ["North", "East", "South", "West"];

let currentX = 2;
let currentY = 2;
let currentDirection = 0; // North

type Direction = {
  direction: number;
  dx: number;
  dy: number;
};

const directions: Direction[] = [
  { direction: 0, dx: 0, dy: -1 }, // NORTH
  { direction: 1, dx: 1, dy: 0 }, // EAST
  { direction: 2, dx: 0, dy: +1 }, // SOUTH
  { direction: 3, dx: -1, dy: 0 }, // WEST
];

function drawRover() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#718881";
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      ctx.strokeRect(10 + column * 56, 10 + row * 56, 56, 56);
    }
  }
  ctx.save();
  ctx.translate(38 + currentX * 56, 38 + currentY * 56);
  ctx.rotate(currentDirection * Math.PI / 2);
  ctx.fillStyle = "#27766b";
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(17, 16);
  ctx.lineTo(-17, 16);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  readout.textContent = `Position: (${currentX}, ${currentY}) · Facing: ${
    headings[currentDirection]
  }`;
}

type Command = {
  execute: () => void;
};

const forwardCommand: Command = {
  execute: () => {
    currentX = Math.max(
      0,
      Math.min(4, currentX + directions[currentDirection].dx),
    );
    currentY = Math.max(
      0,
      Math.min(4, currentY + directions[currentDirection].dy),
    );
  },
};

const rightCommand: Command = {
  execute: () => {
    currentDirection = (currentDirection + 1) % 4;
  },
};

function runCommand(command: Command) {
  command.execute();
  drawRover();
}

document.querySelector<HTMLButtonElement>("#rover-forward")!.onclick = () => {
  runCommand(forwardCommand);
};
document.querySelector<HTMLButtonElement>("#rover-right")!.onclick = () => {
  runCommand(rightCommand);
};
document.querySelector<HTMLButtonElement>("#rover-reset")!.onclick = () => {
  currentX = 2;
  currentY = 2;
  currentDirection = 0;
  drawRover();
};
drawRover();
