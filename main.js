const graph = document.querySelector("#graph");
const height = graph.clientHeight;
const width = graph.clientWidth;
const o = {
    x: width / 2,
    y: height / 2,
};
const svg = d3.select("#graph");
// graph.setAttribute("viewBox", `0 0 100 100`);

// for (let i = 0; i < 8; i++) {
//     const j = 100 / 8;
//     svg.append("path")
//         .attr(
//             "d",
//             d3.line()([
//                 [i * j, 0],
//                 [i * j, height],
//             ])
//         )
//         .attr("stroke", "black")
//         .attr("fill", "none")
//         .attr("stroke-width", 0.25);
//     svg.append("path")
//         .attr(
//             "d",
//             d3.line()([
//                 [0, i * j],
//                 [width, i * j],
//             ])
//         )
//         .attr("stroke", "black")
//         .attr("fill", "none")
//         .attr("stroke-width", 0.25);
// }

// svg.append("circle")
//     .attr("cx", 50)
//     .attr("cy", 50)
//     .attr("r", 10)
//     .classed("circle", true);

// svg.append("rect")
//     .attr("x", o["x"])
//     .attr("y", o["y"])
//     .attr("width", 100)
//     .attr("height", 100)
//     .classed("rect", true);
const color_list = [
    "red",
    "green",
    "blue",
    "brown",
    "black",
    "yellow",
    "orange",
];
const colors = document.querySelector("#colors");
color_list.forEach((sub_color) => {
    const btn = document.createElement("button");
    btn.textContent = sub_color;
    btn.type = "button";
    colors.appendChild(btn);
});

let drawing = false;

svg.on("mousedown", () => {
    drawing = true;
});

svg.on("mouseup", () => {
    drawing = false;
    drawbet.pop();
});

svg.on("touchstart", () => {
    drawing = true;
});

svg.on("touchend", () => {
    drawing = false;
    drawbet.pop();
});

let drawbet = [];
let color = "red";

svg.on("mousemove", (e) => {
    if (drawing === false) {
        return;
    }
    const coords = d3.pointer(e);
    drawbet.push(coords);

    if (drawbet.length != 1) {
        svg.append("path")
            .attr("d", d3.line()(drawbet))
            .attr("stroke", color)
            .attr("fill", "none")
            .attr("stroke-width", 10);
        drawbet.shift();
    }

    svg.append("circle")
        .attr("cx", coords[0])
        .attr("cy", coords[1])
        .attr("r", 5)
        .style("fill", color);
});

svg.on("touchmove", (e) => {
    if (drawing === false) {
        return;
    }
    const coords = d3.pointer(e);
    drawbet.push(coords);

    if (drawbet.length != 1) {
        svg.append("path")
            .attr("d", d3.line()(drawbet))
            .attr("stroke", color)
            .attr("fill", "none")
            .attr("stroke-width", 10);
        drawbet.shift();
    }

    svg.append("circle")
        .attr("cx", coords[0])
        .attr("cy", coords[1])
        .attr("r", 5)
        .style("fill", color);
});

document.querySelector("#eraser").addEventListener("click", () => {
    svg.selectAll("*").remove();
});

document.querySelector("#colors").addEventListener("click", (e) => {
    color = e.target.textContent;
});
