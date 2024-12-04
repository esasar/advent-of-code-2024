const findPatterns = (input) => {
    const pattern = /(?=(XMAS|SAMX))/g;
    const matches = [...input.matchAll(pattern)];

    return matches.length;
}

const formMatrix = (input) => {
    const rows = input.split("\n");
    const matrix = [];
    for (const row of rows) {
        const matrixRow = [];
        const characters = row.split("");
        for (const char of characters) {
            matrixRow.push(char);
        }
        matrix.push(matrixRow);
    }
    return matrix;
}

const flipAlongDiagonal = (input) => {
    const matrix = formMatrix(input);
    const newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        newMatrix.push([]);
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            newMatrix[j][i] = matrix[i][j];
        }
    }

    return formString(newMatrix);
}

const flipAlongVertical = (input) => {
    const matrix = formMatrix(input);
    const newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        newMatrix.push([]);
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            newMatrix[i][matrix[i].length - j] = matrix[i][j];
        }
    }

    return formString(newMatrix);
}

const formDiagonals = (input) => {
    const matrix = formMatrix(input);
    const diagonals = [];
    for (let i = 0; i < matrix.length; i++) {
        let diagonal = [];
        let row = i;
        let col = 0;
        while (row >= 0) {
            diagonal.push(matrix[row][col]);
            row--;
            col++;
        }
        diagonals.push(diagonal);
    }

    for (let i = 1; i < matrix[0].length; i++) {
        let diagonal = [];
        let row = matrix.length - 1;
        let col = i;
        while (col < matrix[0].length) {
            diagonal.push(matrix[row][col]);
            row--;
            col++;
        }
        diagonals.push(diagonal);
    }

    return formString(diagonals);
}

const formString = (matrix) => {
    let string = "";
    for (const row of matrix) {
        const line = row.join("") + "\n";
        string = string.concat('', line);
    }

    return string;
}

const part1 = (input) => {
    let count = 0;

    count += findPatterns(input);
    count += findPatterns(flipAlongDiagonal(input));
    count += findPatterns(formDiagonals(input));
    count += findPatterns(formDiagonals(flipAlongVertical(input)));

    return count;
};

const part2 = (input) => {
    const matrix = formMatrix(input);
    let count = 0;

    for (let i = 1; i < matrix.length - 1; i++) {
        for (let j = 1; j < matrix[i].length - 1; j++) {
            if (matrix[i][j] === "A") {
                const topLeft = matrix[i - 1][j - 1];
                const bottomRight = matrix[i + 1][j + 1];
                const topRight = matrix[i - 1][j + 1];
                const bottomLeft = matrix[i + 1][j - 1];

                if ((topLeft === "S" && bottomRight === "M" || topLeft === "M" && bottomRight === "S") &&
                    (topRight === "S" && bottomLeft === "M" || topRight === "M" && bottomLeft === "S")) {
                    count++;
                }
            }
        }
    }

    return count;
};

export { part1, part2 };