const part1 = (input) => {
    const pattern = /mul\((\d+),(\d+)\)/g;
    const matches = input.matchAll(pattern);

    const result = matches.reduce((acc, cur) => {
        return acc + parseInt(cur[1]) * parseInt(cur[2]);
    }, 0);

    return result;
};


const part2 = (input) => {
    const pattern = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
    const matches = input.matchAll(pattern);

    let enable = true;
    
    const result = matches.reduce((acc, cur) => {
        switch (cur[0]) {
            case "do()":
                enable = true;
                break;
            case "don't()":
                enable = false;
                break;
            case cur[0]:
                if (enable) {
                    acc += parseInt(cur[1]) * parseInt(cur[2]);
                }
                break
        }
        return acc;
    }, 0);

    return result;
};

export { part1, part2 };