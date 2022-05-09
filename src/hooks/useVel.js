import { useState } from "react";
import { min, max, initW2, alfa, degTorad } from "../utils/globals";

function getW2(data) {
  return Math.sqrt(Math.pow(initW2, 2) + 2 * 13 * (data.teta2 * 1 * degTorad));
}

function getW3(data) {
  return (
    (0.2 * data.w2 * Math.sin(parseInt(data.teta2 * 1) * degTorad) -
      0.2 *
        data.w2 *
        Math.cos(data.teta2 * 1 * degTorad) *
        Math.tan(data.teta4 * 1 * degTorad)) /
    (0.7 *
      Math.cos(data.teta3 * 1 * degTorad) *
      Math.tan(data.teta4 * 1 * degTorad) -
      0.7 * Math.sin(data.teta3 * 1 * degTorad))
  );
}

function getW4(data) {
  return (
    (0.2 * data.w2 * Math.cos(data.teta2 * 1 * degTorad) +
      0.7 * data.w3 * Math.cos(data.teta3 * 1 * degTorad)) /
    (0.8 * Math.cos(data.teta4 * degTorad))
  );
}

function getW5(data) {
  return (
    (0.6 * data.w4 * Math.cos(data.teta4 * 1 * degTorad)) /
    (1.2 * Math.cos(data.teta6 * 1 * degTorad))
  );
}

export function getVels(data) {
  let dataVels = [];
  data = data.map((p) => {
    const w2 = getW2(p);
    p = { ...p, w2 };
    const w3 = getW3(p);
    p = { ...p, w3 };
    const w4 = getW4(p);
    p = { ...p, w4 };
    const w5 = getW5(p);
    p = { ...p, w5 };
    dataVels.push({
      teta2: p.teta2,
      w2,
      w3,
      w4,
      w5,
      xAxis: `${(p.teta2 * 2) / 360}π`,
    });
    return p;
  });
  return [dataVels, data];
}
