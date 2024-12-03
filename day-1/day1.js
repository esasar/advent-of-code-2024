const part1 = (input) => {
    const arr1 = [];
    const arr2 = [];

    input.trim().split("\n").forEach((pair) => {
        const [num1, num2] = pair.split(/\s+/);
        arr1.push(parseInt(num1));
        arr2.push(parseInt(num2));
    });

    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    const dists = arr1.map((val, idx) => {
        return Math.abs(val - arr2[idx]);
    });

    const result = dists.reduce((acc, cur) => {
        return acc + cur;
    }, 0);

    return result;
};

const part2 = (input) => {
    const arr1 = [];
    const arr2 = [];

    input.trim().split("\n").forEach((pair) => {
        const [num1, num2] = pair.split(/\s+/);
        arr1.push(parseInt(num1));
        arr2.push(parseInt(num2));
    });

    const occurances = arr2.reduce((map, num) => {
        map.set(num, (map.get(num) || 0) + 1);
        return map;
    }, new Map());

    const result = arr1.reduce((acc, num) => {
        if (occurances.has(num)) {
            return acc + num * occurances.get(num);
        }
        return acc;
    }, 0);

    return result
};

export { part1, part2 };