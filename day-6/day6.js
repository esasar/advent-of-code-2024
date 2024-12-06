const maze = {
    height: 0,
    width: 0,
    obstacles: [],
};

const guard = {
    x: 0,
    y: 0,
    direction: "N",
};

var visited = [];

const addVisited = (position) => {

    const visitedExists = visited.find((visitedPosition) => visitedPosition.x === position.x && visitedPosition.y === position.y);

    if (!visitedExists) {
        const newPosition = { x: position.x, y: position.y, direction: [position.direction] };
        visited.push(newPosition);
        return 1; // continue
    } else if (!visitedExists.direction.includes(position.direction)) {
        visitedExists.direction.push(position.direction);
        return 1; // continue
    } else {
        return 0; // stop
    }
};

const move = () => {
    const position = { x: guard.x, y: guard.y, direction: guard.direction };

    /** exiting the grid */
    if ((guard.direction === "N" && guard.x - 1 < 0) || (guard.direction === "E" && guard.y + 1 >= maze.width) || (guard.direction === "S" && guard.x + 1 >= maze.height) || (guard.direction === "W" && guard.y - 1 < 0)) {
        return -1;
    }

    const a = addVisited(position);

    if (a === 0) {
        return -2; // LOOP!
    };

    if (guard.direction === "N") {
        if (maze.obstacles.some((obstacle) => obstacle.x === guard.x - 1 && obstacle.y === guard.y)) {
            guard.direction = "E";
        } else {
            guard.x--;
        }
    } else if (guard.direction === "E") {
        if (maze.obstacles.some((obstacle) => obstacle.x === guard.x && obstacle.y === guard.y + 1)) {
            guard.direction = "S";
        } else {
            guard.y++;
        }
    } else if (guard.direction === "S") {
        if (maze.obstacles.some((obstacle) => obstacle.x === guard.x + 1 && obstacle.y === guard.y)) {
            guard.direction = "W";
        } else {
            guard.x++;
        }
    } else if (guard.direction === "W") {
        if (maze.obstacles.some((obstacle) => obstacle.x === guard.x && obstacle.y === guard.y - 1)) {
            guard.direction = "N";
        } else {
            guard.y--;
        }
    }

    return 1;
}

const part1 = (input) => {
    visited = [];
    const lines = input.split("\n").map((line) => line.split(""));

    maze.height = parseInt(lines.length);
    maze.width = parseInt(lines[0].length);

    for (let x = 0; x < maze.height; x++) {
        for (let y = 0; y < maze.width; y++) {
            if (lines[x][y] === "#") {
                maze.obstacles.push({ x, y });
            }

            if (lines[x][y] === "^") {
                guard.x = x;
                guard.y = y;
                guard.direction = "N";
            }
        }
    }

    while (move() !== -1) {
    }

    /** +1 for the last position */
    return visited.length + 1;
};

const part2 = (input) => {
    visited = [];
    const lines = input.split("\n").map((line) => line.split(""));
    
    maze.height = parseInt(lines.length);
    maze.width = parseInt(lines[0].length);

    for (let x = 0; x < maze.height; x++) {
        for (let y = 0; y < maze.width; y++) {
            if (lines[x][y] === "#") {
                maze.obstacles.push({ x, y });
            }

            if (lines[x][y] === "^") {
                guard.x = x;
                guard.y = y;
                guard.direction = "N";
            }
        }
    }

    while (move() !== -1) {
    }

    maze.height = parseInt(lines.length);
    maze.width = parseInt(lines[0].length);

    for (let x = 0; x < maze.height; x++) {
        for (let y = 0; y < maze.width; y++) {
            if (lines[x][y] === "#") {
                maze.obstacles.push({ x, y });
            }

            if (lines[x][y] === "^") {
                guard.x = x;
                guard.y = y;
                guard.direction = "N";
            }
        }
    }

    const originalGuard = { x: guard.x, y: guard.y, direction: guard.direction };

    let result = 0;
    let howmany = 0;

    const newVisited = visited.slice();

    // add an obstacle at EACH visited position and check if we end in a loop
    newVisited.forEach((position) => {
        maze.obstacles.push({ x: position.x, y: position.y });
        guard.x = originalGuard.x;
        guard.y = originalGuard.y;
        guard.direction = originalGuard.direction;
        visited = [];
        howmany++;

        while (true) {
            const moveresult = move();
            if (moveresult === -2) {
                result++;
                break;
            }

            if (moveresult === -1) {
                break;
            }
        }

        maze.obstacles.pop(); 
    });

    /** of by one error */
    return result + 1;
};

export { part1, part2 };