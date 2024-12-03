import { readFileSync } from 'fs';

const solver = (fun, inputpath) => {
    const data = readFileSync(inputpath, 'utf8');

    return fun(data);
};

const main = async () => {
    const day = process.argv[2];
    if (!day) {
        console.log("Please provide a day number");
        process.exit(1);
    }

    try {
        const modulePath = `./day-${day}/day${day}.js`;
        const inputPath = `./day-${day}/input`;
        const { part1, part2 } = await import(modulePath);

        console.log(`Day ${day}:`);
        console.log(`Part 1: ${solver(part1, inputPath)}`);
        console.log(`Part 2: ${solver(part2, inputPath)}`);
    } catch (err) {
        if (err.code === "ERR_MODULE_NOT_FOUND") {
            console.error(`Day ${day} not found`);
        } else {
            console.error(err);
        }
        process.exit(1);
    }
};

main();