"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualizeMovement = visualizeMovement;
var d3 = _interopRequireWildcard(require("d3"));
var _movements = _interopRequireDefault(require("./data/movements.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const svg = d3.select("body").append("svg").attr("width", 500).attr("height", 500);
function drawLine(person, pointA, pointB) {
  svg.append("line").attr("x1", person[pointA].x).attr("y1", person[pointA].y).attr("x2", person[pointB].x).attr("y2", person[pointB].y).attr("stroke", "black");
}
function drawMovement(stepData) {
  svg.selectAll("*").remove(); // Clear previous drawings

  // Draw Tori
  const tori = stepData.tori;
  Object.keys(tori).forEach((key, i, arr) => {
    if (i < arr.length - 1) {
      drawLine(tori, arr[i], arr[i + 1]);
    }
  });

  // Draw Uke
  const uke = stepData.uke;
  Object.keys(uke).forEach((key, i, arr) => {
    if (i < arr.length - 1) {
      drawLine(uke, arr[i], arr[i + 1]);
    }
  });
}

// Visualize the entire movement with transitions
let currentStep = 0;
function visualizeMovement() {
  if (currentStep < _movements.default[0].steps.length) {
    drawMovement(_movements.default[0].steps[currentStep]);
    currentStep++;
    setTimeout(visualizeMovement, 2000); // 2-second delay between steps
  }
}