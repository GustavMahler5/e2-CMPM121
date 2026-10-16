export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;

type shiftResults = {
  producers: number;
  production: number;
  consumption: number;
  balance: number;
};

function calculateShift(producers: number): shiftResults {
  const production = producers * 3;
  const consumption = 6;
  const balance = production - consumption;

  return {
    producers,
    production,
    consumption,
    balance,
  };
}

type graphRows = {
  label: string;
  value: number;
  color: string;
};

function drawData(dataArray: graphRows[]) {
  dataArray.forEach((data, index) => {
    const row = 102 + index * 52;

    ctx.fillStyle = "#233e43";
    ctx.fillText(`${data.label}: ${data.value}`, 18, row);

    ctx.fillStyle = data.color;
    ctx.fillRect(18, row + 8, data.value * 14, 20);
  });
}

function writeReadout(shift: shiftResults) {
  readout.textContent =
    `Assigned: ${shift.producers}/6 · Production: ${shift.production} · Consumption: ${shift.consumption} · Balance: ${
      shift.balance > 0 ? "+" : ""
    }${shift.balance}`;
}

function drawGraph(shift: shiftResults) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < shift.producers ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < shift.producers ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }

  const data: graphRows[] = [
    {
      label: "Production",
      value: shift.production,
      color: "#27766b",
    },
    {
      label: "Consumption",
      value: shift.consumption,
      color: "#a44d23",
    },
  ];

  drawData(data);
}

let currentProducers = 2;

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  currentProducers = Math.max(0, currentProducers - 1);
  drawGraph(calculateShift(currentProducers));
  writeReadout(calculateShift(currentProducers));
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  currentProducers = Math.min(6, currentProducers + 1);
  drawGraph(calculateShift(currentProducers));
  writeReadout(calculateShift(currentProducers));
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    currentProducers = 2;
    drawGraph(calculateShift(currentProducers));
    writeReadout(calculateShift(currentProducers));
  };
drawGraph(calculateShift(currentProducers));
writeReadout(calculateShift(currentProducers));
