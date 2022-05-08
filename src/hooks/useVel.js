import { useState } from "react";
import { min, max, initW2, alfa, degTorad } from "../utils/globals";

function getW2(initW2) {
  let arrayW2 = [];
  for (let i = min; i <= max; i += 12) {
    const W2 = Math.sqrt(Math.pow(initW2, 2) + 2 * 13 * (i * degTorad));
    arrayW2.push({
      xAxis: `${(i * 2) / 360}π`,
      degree: `${i}°`,
      W2,
    });
  }
  return arrayW2;
}
function getW3(w2 = []) {
  let w3 = [];
  w2.forEach((w) => {
    const w3 = 0.2 * w * Math.sin(parseInt(w.degree) * degTorad);
  });
}

export default function useW2() {
  const [W2, setW2] = useState(() => {
    return getW2(initW2);
  });

  return W2;
}

export function getWData() {
  const w2 = getW2(initW2);
  console.log(w2);
}
