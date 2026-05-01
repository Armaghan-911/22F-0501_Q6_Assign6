async function init() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    await fetch("/init", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({rows, cols})
    });
}

async function step() {
    const res = await fetch("/step");
    const data = await res.json();

    document.getElementById("percepts").innerText = data.percepts;
    document.getElementById("steps").innerText = data.steps;

    drawGrid(data.grid);
}

function drawGrid(grid) {
    const div = document.getElementById("grid");
    div.innerHTML = "";

    grid.forEach(row => {
        const rowDiv = document.createElement("div");

        row.forEach(cell => {
            const cellDiv = document.createElement("div");
            cellDiv.className = "cell";

            if (cell === "SAFE") cellDiv.style.background = "green";
            if (cell === "UNKNOWN") cellDiv.style.background = "gray";
            if (cell === "A") cellDiv.style.background = "blue";

            rowDiv.appendChild(cellDiv);
        });

        div.appendChild(rowDiv);
    });
}