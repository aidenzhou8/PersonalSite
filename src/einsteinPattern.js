/**
 * Einstein Tile Pattern Generator
 * Port of https://github.com/asmoly/Einstein_Tile_Generator
 * Based on: Smith, Myers, Kaplan & Goodman-Strauss (2023) - An aperiodic monotile
 */

const PI = Math.PI;
const Y_AXIS = { x: 0.5, y: 0.8660254037844386 };

function vec(x, y) {
  return { x, y };
}

function hexToCart(x, y) {
  return vec(x + Y_AXIS.x * y, Y_AXIS.y * y);
}

const identity = [1, 0, 0, 0, 1, 0];

function invertMat(mat) {
  const det = mat[0] * mat[4] - mat[1] * mat[3];
  return [
    mat[4] / det, -mat[1] / det, (mat[1] * mat[5] - mat[2] * mat[4]) / det,
    -mat[3] / det, mat[0] / det, (mat[2] * mat[3] - mat[0] * mat[5]) / det,
  ];
}

function matMul(A, B) {
  return [
    A[0] * B[0] + A[1] * B[3], A[0] * B[1] + A[1] * B[4], A[0] * B[2] + A[1] * B[5] + A[2],
    A[3] * B[0] + A[4] * B[3], A[3] * B[1] + A[4] * B[4], A[3] * B[2] + A[4] * B[5] + A[5],
  ];
}

function vecAdd(p, q) {
  return vec(p.x + q.x, p.y + q.y);
}

function vecSub(p, q) {
  return vec(p.x - q.x, p.y - q.y);
}

function getRotMat(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [c, -s, 0, s, c, 0];
}

function getTranslMat(tx, ty) {
  return [1, 0, tx, 0, 1, ty];
}

function getRotMatAboutPoint(p, angle) {
  return matMul(getTranslMat(p.x, p.y), matMul(getRotMat(angle), getTranslMat(-p.x, -p.y)));
}

function matVecMul(M, P) {
  return vec(M[0] * P.x + M[1] * P.y + M[2], M[3] * P.x + M[4] * P.y + M[5]);
}

function matchSegment(p, q) {
  return [q.x - p.x, p.y - q.y, p.x, q.y - p.y, q.x - p.x, p.y];
}

function matchShapes(p1, q1, p2, q2) {
  return matMul(matchSegment(p2, q2), invertMat(matchSegment(p1, q1)));
}

function getIntersectPoint(p1, q1, p2, q2) {
  const d = (q2.y - p2.y) * (q1.x - p1.x) - (q2.x - p2.x) * (q1.y - p1.y);
  const uA = ((q2.x - p2.x) * (p1.y - p2.y) - (q2.y - p2.y) * (p1.x - p2.x)) / d;
  return vec(p1.x + uA * (q1.x - p1.x), p1.y + uA * (q1.y - p1.y));
}

const hatOutline = [
  hexToCart(0, 0), hexToCart(-1, -1), hexToCart(0, -2), hexToCart(2, -2),
  hexToCart(2, -1), hexToCart(4, -2), hexToCart(5, -1), hexToCart(4, 0),
  hexToCart(3, 0), hexToCart(2, 2), hexToCart(0, 3), hexToCart(0, 2),
  hexToCart(-1, 2),
];

const RULES = [
  ['H'],
  [0, 0, 'P', 2],
  [1, 0, 'H', 2],
  [2, 0, 'P', 2],
  [3, 0, 'H', 2],
  [4, 4, 'P', 2],
  [0, 4, 'F', 3],
  [2, 4, 'F', 3],
  [4, 1, 3, 2, 'F', 0],
  [8, 3, 'H', 0],
  [9, 2, 'P', 0],
  [10, 2, 'H', 0],
  [11, 4, 'P', 2],
  [12, 0, 'H', 2],
  [13, 0, 'F', 3],
  [14, 2, 'F', 1],
  [15, 3, 'H', 4],
  [8, 2, 'F', 1],
  [17, 3, 'H', 0],
  [18, 2, 'P', 0],
  [19, 2, 'H', 2],
  [20, 4, 'F', 3],
  [20, 0, 'P', 2],
  [22, 0, 'H', 2],
  [23, 4, 'F', 3],
  [23, 0, 'F', 3],
  [16, 0, 'P', 2],
  [9, 4, 0, 2, 'T', 2],
  [4, 0, 'F', 3],
];

function HInit() {
  const H_outline = [
    vec(0, 0), vec(4, 0), vec(4.5, Y_AXIS.y), vec(2.5, 5 * Y_AXIS.y),
    vec(1.5, 5 * Y_AXIS.y), vec(-Y_AXIS.x, Y_AXIS.y),
  ];
  const meta = { shape: H_outline, width: 2, children: [] };
  meta.addChild = (T, geom) => meta.children.push({ T, geom });
  meta.addChild(matchShapes(hatOutline[5], hatOutline[7], H_outline[5], H_outline[0]), { shape: hatOutline, draw: () => {} });
  meta.addChild(matchShapes(hatOutline[9], hatOutline[11], H_outline[1], H_outline[2]), { shape: hatOutline, draw: () => {} });
  meta.addChild(matchShapes(hatOutline[5], hatOutline[7], H_outline[3], H_outline[4]), { shape: hatOutline, draw: () => {} });
  meta.addChild(matMul(getTranslMat(2.5, Y_AXIS.y), matMul(
    [-Y_AXIS.x, -Y_AXIS.y, 0, Y_AXIS.y, -Y_AXIS.x, 0],
    [Y_AXIS.x, 0, 0, 0, -Y_AXIS.x, 0]
  )), { shape: hatOutline, draw: () => {} });
  return meta;
}

function TInit() {
  const T_outline = [vec(0, 0), vec(3, 0), vec(1.5, 3 * Y_AXIS.y)];
  const meta = { shape: T_outline, width: 2, children: [] };
  meta.addChild = (T, geom) => meta.children.push({ T, geom });
  meta.addChild([Y_AXIS.x, 0, Y_AXIS.x, 0, Y_AXIS.x, Y_AXIS.y], { shape: hatOutline, draw: () => {} });
  return meta;
}

function PInit() {
  const P_outline = [vec(0, 0), vec(4, 0), vec(3, 2 * Y_AXIS.y), vec(-1, 2 * Y_AXIS.y)];
  const meta = { shape: P_outline, width: 2, children: [] };
  meta.addChild = (T, geom) => meta.children.push({ T, geom });
  meta.addChild([Y_AXIS.x, 0, 1.5, 0, Y_AXIS.x, Y_AXIS.y], { shape: hatOutline, draw: () => {} });
  meta.addChild(matMul(getTranslMat(0, 2 * Y_AXIS.y), matMul(
    [Y_AXIS.x, Y_AXIS.y, 0, -Y_AXIS.y, Y_AXIS.x, 0],
    [Y_AXIS.x, 0, 0, 0, Y_AXIS.x, 0]
  )), { shape: hatOutline, draw: () => {} });
  return meta;
}

function FInit() {
  const F_outline = [vec(0, 0), vec(3, 0), vec(3.5, Y_AXIS.y), vec(3, 2 * Y_AXIS.y), vec(-1, 2 * Y_AXIS.y)];
  const meta = { shape: F_outline, width: 2, children: [] };
  meta.addChild = (T, geom) => meta.children.push({ T, geom });
  meta.addChild([Y_AXIS.x, 0, 1.5, 0, Y_AXIS.x, Y_AXIS.y], { shape: hatOutline, draw: () => {} });
  meta.addChild(matMul(getTranslMat(0, 2 * Y_AXIS.y), matMul(
    [Y_AXIS.x, Y_AXIS.y, 0, -Y_AXIS.y, Y_AXIS.x, 0],
    [Y_AXIS.x, 0, 0, 0, Y_AXIS.x, 0]
  )), { shape: hatOutline, draw: () => {} });
  return meta;
}

function constructPatch(H, T, P, F) {
  const shapes = { H, T, P, F };
  const ret = { shape: [], width: H.width, children: [] };
  ret.addChild = (T, geom) => ret.children.push({ T, geom });

  for (const r of RULES) {
    if (r.length === 1) {
      ret.addChild(identity, shapes[r[0]]);
    } else if (r.length === 4) {
      const poly = ret.children[r[0]].geom.shape;
      const T = ret.children[r[0]].T;
      const P = matVecMul(T, poly[(r[1] + 1) % poly.length]);
      const Q = matVecMul(T, poly[r[1]]);
      const nshp = shapes[r[2]];
      const npoly = nshp.shape;
      ret.addChild(matchShapes(npoly[r[3]], npoly[(r[3] + 1) % npoly.length], P, Q), nshp);
    } else {
      const chP = ret.children[r[0]];
      const chQ = ret.children[r[2]];
      const P = matVecMul(chQ.T, chQ.geom.shape[r[3]]);
      const Q = matVecMul(chP.T, chP.geom.shape[r[1]]);
      const nshp = shapes[r[4]];
      const npoly = nshp.shape;
      ret.addChild(matchShapes(npoly[r[5]], npoly[(r[5] + 1) % npoly.length], P, Q), nshp);
    }
  }
  return ret;
}

function recentre(meta) {
  let cx = 0, cy = 0;
  for (const p of meta.shape) {
    cx += p.x;
    cy += p.y;
  }
  cx /= meta.shape.length;
  cy /= meta.shape.length;
  const tr = vec(-cx, -cy);
  for (let i = 0; i < meta.shape.length; i++) {
    meta.shape[i] = vecAdd(meta.shape[i], tr);
  }
  const M = getTranslMat(-cx, -cy);
  for (const ch of meta.children) {
    ch.T = matMul(M, ch.T);
  }
}

function constructMetatiles(patch) {
  const bps1 = matVecMul(patch.children[8].T, patch.children[8].geom.shape[2]);
  const bps2 = matVecMul(patch.children[21].T, patch.children[21].geom.shape[2]);
  const rbps = matVecMul(getRotMatAboutPoint(bps1, -2 * PI / 3), bps2);

  const p72 = matVecMul(patch.children[7].T, patch.children[7].geom.shape[2]);
  const p252 = matVecMul(patch.children[25].T, patch.children[25].geom.shape[2]);

  const llc = getIntersectPoint(bps1, rbps, matVecMul(patch.children[6].T, patch.children[6].geom.shape[2]), p72);
  let w = vecSub(matVecMul(patch.children[6].T, patch.children[6].geom.shape[2]), llc);

  const new_H_outline = [llc, bps1];
  w = matVecMul(getRotMat(-PI / 3), w);
  new_H_outline.push(vecAdd(new_H_outline[1], w));
  new_H_outline.push(matVecMul(patch.children[14].T, patch.children[14].geom.shape[2]));
  w = matVecMul(getRotMat(-PI / 3), w);
  new_H_outline.push(vecSub(new_H_outline[3], w));
  new_H_outline.push(matVecMul(patch.children[6].T, patch.children[6].geom.shape[2]));

  const new_H = { shape: new_H_outline, width: patch.width * 2, children: [] };
  new_H.addChild = (T, geom) => new_H.children.push({ T, geom });
  for (const i of [0, 9, 16, 27, 26, 6, 1, 8, 10, 15]) {
    new_H.addChild(patch.children[i].T, patch.children[i].geom);
  }

  const new_P_outline = [p72, vecAdd(p72, vecSub(bps1, llc)), bps1, llc];
  const new_P = { shape: new_P_outline, width: patch.width * 2, children: [] };
  new_P.addChild = (T, geom) => new_P.children.push({ T, geom });
  for (const i of [7, 2, 3, 4, 28]) {
    new_P.addChild(patch.children[i].T, patch.children[i].geom);
  }

  const new_F_outline = [
    bps2, matVecMul(patch.children[24].T, patch.children[24].geom.shape[2]),
    matVecMul(patch.children[25].T, patch.children[25].geom.shape[0]),
    p252, vecAdd(p252, vecSub(llc, bps1)),
  ];
  const new_F = { shape: new_F_outline, width: patch.width * 2, children: [] };
  new_F.addChild = (T, geom) => new_F.children.push({ T, geom });
  for (const i of [21, 20, 22, 23, 24, 25]) {
    new_F.addChild(patch.children[i].T, patch.children[i].geom);
  }

  const AAA = new_H_outline[2];
  const BBB = vecAdd(new_H_outline[1], vecSub(new_H_outline[4], new_H_outline[5]));
  const CCC = matVecMul(getRotMatAboutPoint(BBB, -PI / 3), AAA);
  const new_T_outline = [BBB, CCC, AAA];
  const new_T = { shape: new_T_outline, width: patch.width * 2, children: [] };
  new_T.addChild = (T, geom) => new_T.children.push({ T, geom });
  new_T.addChild(patch.children[11].T, patch.children[11].geom);

  recentre(new_H);
  recentre(new_P);
  recentre(new_F);
  recentre(new_T);

  return [new_H, new_T, new_P, new_F];
}

const toScreenMat = [1, 0, 0, 0, -1, 0];

function collectHatTiles(meta, S, level, polygons) {
  if (level <= 0) return;
  for (const ch of meta.children) {
    const geom = ch.geom;
    const T = matMul(S, ch.T);
    if (geom.shape && geom.shape.length === 13) {
      const screenVerts = geom.shape.map((p) => matVecMul(T, p));
      polygons.push(screenVerts);
    } else if (geom.children) {
      collectHatTiles(geom, T, level - 1, polygons);
    }
  }
}

/**
 * Generate a patch of Einstein hat tiles at the given level.
 * Level 0 = 4 hats, Level 1 = 29*4 = 116 hats, Level 2 = ~464 hats, etc.
 * @param {number} level - Substitution level (0-2 recommended for performance)
 * @returns {Array<Array<{x,y}>>} Array of polygons, each polygon is array of vertices
 */
export function generateEinsteinPatch(level = 1) {
  let tiles = [HInit(), TInit(), PInit(), FInit()];

  for (let i = 0; i < level; i++) {
    const patch = constructPatch(tiles[0], tiles[1], tiles[2], tiles[3]);
    tiles = constructMetatiles(patch);
  }

  const polygons = [];
  // Python uses level = iterations + 1 (init level 1, then increments after each build)
  collectHatTiles(tiles[0], toScreenMat, level + 1, polygons);
  return polygons;
}
