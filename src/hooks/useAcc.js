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
  alfa2,
} from "../utils/globals";

function getAax(data) {
  return -(
    0.2 * alfa2 * Math.sin(data.teta2 * degTorad) +
    0.2 * Math.pow(data.w2, 2) * Math.cos(data.teta2 * degTorad)
  );
}

function getAay(data) {
  return (
    0.2 * alfa2 * Math.cos(data.teta2 * degTorad) -
    0.2 * Math.pow(data.w2, 2) * Math.sin(data.teta2 * degTorad)
  );
}

function getAlfa3(data) {
  return (
    ((data.Aay -
      0.7 * Math.pow(data.w3, 2) * Math.sin(data.teta3 * degTorad) +
      0.8 * Math.pow(data.w4, 2) * Math.sin(data.teta4 * degTorad)) *
      Math.tan(data.teta4 * degTorad) +
      data.Aax -
      0.7 * Math.pow(data.w3, 2) * Math.cos(data.teta3 * degTorad) +
      0.8 * Math.pow(data.w4, 2) * Math.cos(data.teta4 * degTorad)) /
    (0.7 * Math.sin(data.teta3 * degTorad) -
      0.7 * Math.cos(data.teta3 * degTorad) * Math.tan(data.teta4 * degTorad))
  );
}

function getAlfa4(data) {
  return (
    (-data.Aax +
      0.7 * data.alfa3 * Math.sin(data.teta3 * degTorad) +
      0.7 * Math.pow(data.w3, 2) * Math.cos(data.teta3 * degTorad) -
      0.8 * Math.pow(data.w4, 2) * Math.cos(data.teta4 * degTorad)) /
    (0.8 * Math.sin(data.teta4 * degTorad))
  );
}

function getAbx(data) {
  return -(
    0.8 * data.alfa4 * Math.sin(data.teta4 * degTorad) +
    0.8 * Math.pow(data.w4, 2) * Math.cos(data.teta4 * degTorad)
  );
}
function getAby(data) {
  return (
    0.8 * data.alfa4 * Math.cos(data.teta4 * degTorad) -
    0.8 * Math.pow(data.w4, 2) * Math.sin(data.teta4 * degTorad)
  );
}
function getAdx(data) {
  return -(
    0.6 * data.alfa4 * Math.sin(data.teta4 * degTorad) +
    0.6 * Math.pow(data.w4, 2) * Math.cos(data.teta4 * degTorad)
  );
}
function getAdy(data) {
  if (data.teta2 === 48) {
    console.log(
      0.6 * data.alfa4 * Math.cos(data.teta4 * degTorad) -
        0.6 * Math.pow(data.w4, 2) * Math.sin(data.teta4 * degTorad)
    );
  }
  return (
    0.6 * data.alfa4 * Math.cos(data.teta4 * degTorad) -
    0.6 * Math.pow(data.w4, 2) * Math.sin(data.teta4 * degTorad)
  );
}
function getAlfa5(data) {
  return (
    (data.Ady + 1.2 * Math.pow(data.w5, 2) * Math.sin(data.teta6 * degTorad)) /
    (1.2 * Math.cos(data.teta6 * degTorad))
  );
}

export function getAcc(data) {
  let dataAcc = [];
  data = data.map((p) => {
    const Aax = getAax(p);
    p = { ...p, Aax };
    const Aay = getAay(p);
    p = { ...p, Aay };
    const alfa3 = getAlfa3(p);
    p = { ...p, alfa3 };
    const alfa4 = getAlfa4(p);
    p = { ...p, alfa4 };
    const Abx = getAbx(p);
    p = { ...p, Abx };
    const Aby = getAby(p);
    p = { ...p, Aby };
    const Adx = getAdx(p);
    p = { ...p, Adx };
    const Ady = getAdy(p);
    p = { ...p, Ady };
    const alfa5 = getAlfa5(p);
    p = { ...p, alfa5 };
    dataAcc.push({
      teta2: data.teta2,
      Aax,
      Aay,
      alfa3,
      alfa4,
      Abx,
      Aby,
      Adx,
      Ady,
      alfa5,
      xAxis: `${(p.teta2 * 2) / 360}π`,
    });
    if (p.teta2 === 48) {
      console.log(p);
    }
    return p;
  });
  return [dataAcc, data];
}
