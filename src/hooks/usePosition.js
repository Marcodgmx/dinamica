import { useState } from "react";
import {
  l1,
  l2,
  l3,
  l4,
  l0,
  lc,
  l5,
  min,
  max,
  interval,
  degTorad,
  radToDeg,
  teta1,
} from "../utils/globals";

function getA(teta2) {
  return 2 * l2 * l4 * Math.cos(teta2) - 2 * l1 * l4;
}
function getB(teta2) {
  return 2 * l2 * l4 * Math.sin(teta2);
}
function getC(teta2) {
  return (
    Math.pow(l1, 2) +
    Math.pow(l4, 2) +
    Math.pow(l2, 2) -
    Math.pow(l3, 2) -
    2 * l1 * l2 * Math.cos(teta2)
  );
}
function getTeta4(body = {}) {
  return (
    Math.atan(body.B / body.A) * radToDeg +
    180 -
    Math.acos(body.C / Math.sqrt(Math.pow(body.A, 2) + Math.pow(body.B, 2))) *
      radToDeg
  ).toFixed(2);
}
function getTeta3(teta2, teta4) {
  if (teta2 * radToDeg > 230 || teta2 * radToDeg === 0) {
    return (
      180 +
      Math.atan(
        (l1 * Math.sin(teta1) + l4 * Math.sin(teta4) - l2 * Math.sin(teta2)) /
          (l1 * Math.cos(teta1) + l4 * Math.cos(teta4) - l2 * Math.cos(teta2))
      ) *
        radToDeg
    ).toFixed(2);
  } else {
    return (
      Math.atan(
        (l1 * Math.sin(teta1) + l4 * Math.sin(teta4) - l2 * Math.sin(teta2)) /
          (l1 * Math.cos(teta1) + l4 * Math.cos(teta4) - l2 * Math.cos(teta2))
      ) * radToDeg
    ).toFixed(2);
  }
}
function getTeta6(teta2, teta4) {
  /*
  if (teta2 <= 180) {
    return 180 - Math.asin((l0 + lc * Math.sin(teta4)) / l5) * radToDeg;
  } else {
    if (lc * Math.sin(teta4) > l0) {
      return 180 - Math.asin((lc * Math.sin(teta4)) / l5) * radToDeg;
    } else {
      return 180 - Math.asin(l0 / l5) * radToDeg;
    }
  }
  */
  return (180 - Math.asin((l0 + lc * Math.sin(teta4)) / l5) * radToDeg).toFixed(
    2
  );
}
function getTeta5(teta6) {
  return (360 - (180 - teta6)).toFixed(2);
}

export function getAngles() {
  let dataPosition = [];
  for (let i = min; i <= max; i += interval) {
    const angleToRad = i * degTorad;
    const A = getA(angleToRad);
    const B = getB(angleToRad);
    const C = getC(angleToRad);
    const teta4 = getTeta4({
      A,
      B,
      C,
      teta2: i,
    });
    const teta3 = getTeta3(angleToRad, teta4 * degTorad);
    const teta6 = getTeta6(i, teta4 * degTorad);
    const teta5 = getTeta5(teta6);
    dataPosition.push({
      teta2: i,
      teta3,
      teta4,
      teta5,
      teta6,
      xAxis: `${(i * 2) / 360}π`,
    });
  }
  return dataPosition;
}
