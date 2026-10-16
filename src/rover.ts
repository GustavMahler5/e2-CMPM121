export {};

const canvas = document.querySelector<HTMLCanvasElement>("#rover-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>("#rover-readout")!;
const headings = ["North", "East", "South", "West"];
let right = 2;
let forward = 2;
let direction = 0;

function drawRover() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#718881";
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      ctx.strokeRect(10 + column * 56, 10 + row * 56, 56, 56);
    }
  }
  ctx.save();
  ctx.translate(38 + right * 56, 38 + forward * 56);
  ctx.rotate(direction * Math.PI / 2);
  ctx.fillStyle = "#27766b";
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(17, 16);
  ctx.lineTo(-17, 16);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  readout.textContent = `Position: (${right}, ${forward}) · Facing: ${
    headings[direction]
  }`;
}

type Command = {
  execute: () => void;
};

const forwardCommand: Command = {
  execute: () => {
    if (direction === 0) forward = Math.max(0, forward - 1);
    if (direction === 1) right = Math.min(4, right + 1);
    if (direction === 2) forward = Math.min(4, forward + 1);
    if (direction === 3) right = Math.max(0, right - 1);
  },
};

const rightCommand: Command = {
  execute: () => {
    direction = (direction + 1) % 4;
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
  right = 2;
  forward = 2;
  direction = 0;
  drawRover();
};
drawRover();
