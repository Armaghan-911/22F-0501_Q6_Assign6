let grid = [];
let agent = { r: 0, c: 0 };
let stepsLog = "";

// Initialize grid
function init() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    if (!rows || !cols) {
        alert("Enter valid rows and cols");
        return;
    }

    // Create grid
    grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => "UNKNOWN")
    );

    agent = { r: 0, c: 0 };
    grid[0][0] = "A";

    stepsLog = "Start at (0,0)";
    document.getElementById("steps").innerText = stepsLog;
    document.getElementById("percepts").innerText = "Safe";

    drawGrid();
}

// Move agent randomly
function step() {
    if (grid.length === 0) {
        alert("Click Start first");
        return;
    }

    // Clear old position
    grid[agent.r][agent.c] = "SAFE";

    // Random move
    const moves = [
        { r: 0, c: 1 },
        { r: 1, c: 0 },
        { r: 0, c: -1 },
        { r: -1, c: 0 }
    ];

    let validMoves = moves.filter(m => {
        let nr = agent.r + m.r;
        let nc = agent.c + m.c;
        return nr >= 0 && nc >= 0 && nr < grid.length && nc < grid[0].length;
    });

    let move = validMoves[Math.floor(Math.random() * validMoves.length)];

    agent.r += move.r;
    agent.c += move.c;

    grid[agent.r][agent.c] = "A";

    // Fake percepts
    let percept = Math.random() > 0.7 ? "Breeze detected" : "No danger";

    stepsLog += ` → (${agent.r},${agent.c})`;

    document.getElementById("percepts").innerText = percept;
    document.getElementById("steps").innerText = stepsLog;

    drawGrid();
}

// Draw grid
function drawGrid() {
    const div = document.getElementById("grid");
    div.innerHTML = "";

    grid.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

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
