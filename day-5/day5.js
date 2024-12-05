const part1 = (input) => {
    const lines = input.split("\n");
    const rules = lines.splice(0, lines.indexOf("")).map((line) => line.split("|").map(Number));

    const updates = lines.slice(1).map((line) => line.split(",").map(Number));

    const validUpdates = updates.filter((update) => {
        return rules.every(([a, b]) => {
            return update.indexOf(a) == -1 || update.indexOf(b) == -1 || update.indexOf(a) < update.indexOf(b);
        });
    });

    const result = validUpdates.reduce((acc, update) => {
        acc += update[Math.floor(update.length / 2)];
        return acc;
    }, 0);

    return result;
};


const part2 = (input) => {
    const lines = input.split("\n");
    const rules = lines.splice(0, lines.indexOf("")).map((line) => line.split("|").map(Number));

    const updates = lines.slice(1).map((line) => line.split(",").map(Number));

    const invalidUpdates = updates.filter((update) => {
        return rules.some(([a, b]) => {
            return update.indexOf(a) != -1 && update.indexOf(b) != -1 && update.indexOf(a) > update.indexOf(b);
        });
    });

    const validatedUpdates = invalidUpdates.map((update) => {
        update.sort((a, b) => {
            const rule = rules.find((rule) => rule.includes(a) && rule.includes(b));
            return rule.indexOf(a) - rule.indexOf(b);
        });

        return update;
    });

    const result = validatedUpdates.reduce((acc, update) => {
        acc += update[Math.floor(update.length / 2)];
        return acc;
    }, 0);

    return result;
};

export { part1, part2 };