import * as d3 from 'd3';
import movements from './data/movements.json';

const svg = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500);

function drawLine(person, pointA, pointB) {
    svg.append("line")
        .attr("x1", person[pointA].x)
        .attr("y1", person[pointA].y)
        .attr("x2", person[pointB].x)
        .attr("y2", person[pointB].y)
        .attr("stroke", "black");
}
function drawMovement(stepData) {
    svg.selectAll("*").remove();  // Clear previous drawings

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
export function visualizeMovement() {
    if (currentStep < movements[0].steps.length) {
        drawMovement(movements[0].steps[currentStep]);
        currentStep++;
        setTimeout(visualizeMovement, 2000);  // 2-second delay between steps
    }
}

