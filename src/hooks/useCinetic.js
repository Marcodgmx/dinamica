import {
  nodes,
  links,
  masses,
  gravity,
  I2,
  I3,
  I4,
  l1,
  l2,
  l3,
  l4,
  l5,
  l0,
  lc,
  I5,
  cmToMeters,
  degTorad,
} from "../utils/globals";
let ecuation = {};
let ecuationsVectors = {};

const forces = Object.keys(nodes["O2"]);

const ec1 = [1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const ec2 = [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const ec4 = [0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const ec5 = [0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0];
const ec7 = [0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0];
const ec8 = [0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1];
const ec10 = [0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0];
const ec11 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0];
const ec13 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0];
const ec14 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0];
const n = 15;

function getSumForces(data) {
  Object.entries(links).forEach(([link, nodesPerLink], idx) => {
    nodesPerLink.forEach((node) => {
      forces.forEach((force) => {
        let currentForce = "";
        let multiplyBy = 1;
        let currentNode = node;
        if (currentNode.includes("-")) {
          currentNode = currentNode.substring(1);
          currentForce = nodes[currentNode][force];
          if (currentForce !== 0) {
            multiplyBy = -1;
          }
        } else {
          currentForce = nodes[currentNode][force];
          multiplyBy = 1;
        }
        const coeficientForce = currentForce * multiplyBy;
        ecuation = {
          ...ecuation,
          [link + currentNode]: {
            ...ecuation[link + currentNode],
            [force]: coeficientForce,
          },
        };
        if (force.includes("x")) {
          console.log(link, node, force, coeficientForce);
          ecuationsVectors = {
            ...ecuationsVectors,
            [link + "x"]: {
              ...ecuationsVectors[link + "x"],
              [force]: coeficientForce,
              TI: 0,
            },
          };
        } else if (force.includes("y") || force === "TI") {
          ecuationsVectors = {
            ...ecuationsVectors,
            [link + "y"]: {
              ...ecuationsVectors[link + "y"],
              [force]: coeficientForce,
            },
          };
          if (force === "TI") {
            ecuationsVectors = {
              ...ecuationsVectors,
              [link + "y"]: {
                ...ecuationsVectors[link + "y"],
                [force]: gravity * masses[link],
              },
            };
          }
        }
      });
    });
  });
  console.log({ ecuation, ecuationsVectors });
}

function getL2Ec(p, b = []) {
  b.push(masses[2] * p.A2x);
  b.push(masses[2] * p.A2y - masses[2] * gravity);
  b.push(I2 * p.alfa2);
  const r12x = 5.0266 * cmToMeters * Math.cos(p.teta2 * degTorad);
  const r12y = -5.0266 * cmToMeters * Math.sin(p.teta2 * degTorad);
  const r32x = (5.0266 + l2) * cmToMeters * Math.cos(p.teta2 * degTorad);
  const r32y = -(5.0266 + l2) * cmToMeters * Math.sin(p.teta2 * degTorad);
  let ec3 = [];
  for (let i = 1; i <= 15; i++) {
    let coeficient = 0;
    if (i === 1) {
      coeficient = r12y;
    } else if (i === 2) {
      coeficient = r12x;
    } else if (i === 3) {
      coeficient = 1;
    } else if (i === 4) {
      coeficient = r32y;
    } else if (i === 5) {
      coeficient = r32x;
    }
    ec3.push(coeficient);
  }
  const ecs1 = [ec1, ec2, ec3];
  return [b, ecs1];
}

function getL3Ec(p, b = [], ecs = []) {
  b.push(masses[3] * p.A3x);
  b.push(masses[3] * p.A3y - masses[3] * gravity);
  b.push(I3 * p.alfa3);
  const r23x = (l3 / 2) * cmToMeters * Math.cos((1 * p.teta3 + 180) * degTorad);
  const r23y =
    -(l3 / 2) * cmToMeters * Math.sin((1 * p.teta3 + 180) * degTorad);
  let ec6 = [];
  for (let i = 1; i <= 15; i++) {
    let coeficient = 0;
    if (i === 4) {
      coeficient = r23y;
    } else if (i === 5) {
      coeficient = r23x;
    } else if (i === 6) {
      coeficient = -r23y;
    } else if (i === 7) {
      coeficient = -r23x;
    }
    ec6.push(coeficient);
  }
  ecs.push(ec4);
  ecs.push(ec5);
  ecs.push(ec6);
  return [b, ecs];
}

function getL4Ec(p, b = [], ecs = []) {
  b.push(masses[4] * p.A4x);
  b.push(masses[4] * p.A4y - masses[4] * gravity);
  b.push(I4 * p.alfa4);

  const r54x = (lc - l4 / 2) * cmToMeters * Math.cos(p.teta4 * 1 * degTorad);
  const r54y = -(lc - l4 / 2) * cmToMeters * Math.sin(1 * p.teta4 * degTorad);
  const r14x = (l4 / 2) * cmToMeters * Math.cos((1 * p.teta4 + 180) * degTorad);
  const r14y =
    -(l4 / 2) * cmToMeters * Math.sin((1 * p.teta4 + 180) * degTorad);
  const r34x = -r14x;
  const r34y = -r14y;
  let ec9 = [];
  for (let i = 1; i <= 15; i++) {
    let coeficient = 0;
    if (i === 6) {
      coeficient = r34y;
    } else if (i === 7) {
      coeficient = r34x;
    } else if (i === 8) {
      coeficient = r54y;
    } else if (i === 9) {
      coeficient = r54x;
    } else if (i === 14) {
      coeficient = r14y;
    } else if (i === 15) {
      coeficient = r14x;
    }
    ec9.push(coeficient);
  }
  ecs.push(ec7);
  ecs.push(ec8);
  ecs.push(ec9);
  return [b, ecs];
}

function getL5Ec(p, b = [], ecs = []) {
  b.push(masses[5] * p.A5x);
  b.push(masses[5] * p.A5y - masses[5] * gravity);
  b.push(I5 * p.alfa5);

  const r45x = (48.6117 / 100) * Math.cos(p.teta6 * 1 * degTorad);
  const r45y = -(48.6117 / 100) * Math.sin(p.teta6 * 1 * degTorad);
  const r65x = (71.3883 / 100) * Math.cos((p.teta6 * 1 + 180) * degTorad);
  const r65y = -(71.3883 / 100) * Math.sin((p.teta6 * 1 + 180) * degTorad);
  let ec12 = [];
  for (let i = 1; i <= 15; i++) {
    let coeficient = 0;
    if (i === 8) {
      coeficient = r45y;
    } else if (i === 9) {
      coeficient = r45x;
    } else if (i === 10) {
      coeficient = r65y;
    } else if (i === 11) {
      coeficient = r65x;
    }
    ec12.push(coeficient);
  }
  ecs.push(ec10);
  ecs.push(ec11);
  ecs.push(ec12);
  return [b, ecs];
}

function getL6Ec(p, b = [], ecs = []) {
  b.push(masses[6] * p.Aex);
  b.push(masses[6] * gravity);

  ecs.push(ec13);
  ecs.push(ec14);
  return [b, ecs];
}

export function getCineticData(data) {
  data.forEach((p) => {
    let ecs = [];
    let b = [];
    [b, ecs] = getL2Ec(p, b);
    [b, ecs] = getL3Ec(p, b, ecs);
    [b, ecs] = getL4Ec(p, b, ecs);
    [b, ecs] = getL5Ec(p, b, ecs);
    [b, ecs] = getL6Ec(p, b, ecs);
    if (p.teta2 === 48 || p.teta2 === 60) {
      console.log(p.teta4);
      console.log(b);
      console.log(ecs);
    }
  });
}
