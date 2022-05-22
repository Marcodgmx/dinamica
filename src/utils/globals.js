export const radToDeg = 360 / (2 * Math.PI);
export const l1 = 50;
export const l2 = 20;
export const l3 = 70;
export const l4 = 80;
export const l5 = 120;
export const lc = 60;
export const l0 = 40;
export const teta1 = 0 * radToDeg;
export var teta2;

//VEL & AC
export const initW2 = 100 * (2 * Math.PI) * (1 / 60);
export const alfa2 = 13;

//ITERATE THROUGH
export const min = 0;
export const max = 360;
export const interval = 12;

export const degTorad = (2 * Math.PI) / 360;

//LINKS
export const links = {
  2: ["O2", "-A"],
  3: ["A", "-B"],
  4: ["B", "-C", "O4"],
  5: ["C", "D"],
};

//NODES
export const nodes = {
  O2: {
    F12x: 1,
    F12y: 1,
    F23x: 0,
    F23y: 0,
    F34x: 0,
    F34y: 0,
    F45x: 0,
    F45y: 0,
    F14x: 0,
    F14y: 0,
    F56x: 0,
    F56y: 0,
    TI: 0,
  },
  A: {
    F12x: 0,
    F12y: 0,
    F23x: 1,
    F23y: 1,
    F34x: 0,
    F34y: 0,
    F45x: 0,
    F45y: 0,
    F14x: 0,
    F14y: 0,
    F56x: 0,
    F56y: 0,
    TI: 0,
  },
  B: {
    F12x: 0,
    F12y: 0,
    F23x: 0,
    F23y: 0,
    F34x: 1,
    F34y: 1,
    F45x: 0,
    F45y: 0,
    F14x: 0,
    F14y: 0,
    F56x: 0,
    F56y: 0,
    TI: 0,
  },
  C: {
    F12x: 0,
    F12y: 0,
    F23x: 0,
    F23y: 0,
    F34x: 0,
    F34y: 0,
    F45x: 1,
    F45y: 1,
    F14x: 0,
    F14y: 0,
    F56x: 0,
    F56y: 0,
    TI: 0,
  },
  O4: {
    F12x: 0,
    F12y: 0,
    F23x: 0,
    F23y: 0,
    F34x: 0,
    F34y: 0,
    F45x: 0,
    F45y: 0,
    F14x: 1,
    F14y: 1,
    F56x: 0,
    F56y: 0,
    TI: 0,
  },
  D: {
    F12x: 0,
    F12y: 0,
    F23x: 0,
    F23y: 0,
    F34x: 0,
    F34y: 0,
    F45x: 0,
    F45y: 0,
    F14x: 0,
    F14y: 0,
    F56x: 1,
    F56y: 1,
    TI: 0,
  },
};

//GRAVITY
export const gravity = -9.81;

//MASSES
export const masses = {
  2: 23.9716,
  3: 14.0937,
  4: 15.9801,
  5: 32.1276,
  6: 9.4944,
};

//INERTIA
export const I2 = 0.4062;
export const I3 = 0.6604;
export const I4 = 0.9611;
export const I5 = 1;

export const cmToMeters = 1 / 100;
