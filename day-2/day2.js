const part1 = (input) => {
    let result = 0;

    input.trim().split("\n").forEach((line) => {
        const report = line.split(/\s+/);

        const diff = [];

        for (let i = 0; i < report.length - 1; i++) {
            diff.push(parseInt(report[i]) - parseInt(report[i + 1]));
        }

        const sign = Math.sign(diff[0]);
        
        const sameSign = diff.every((val) => {
            return Math.sign(val) === sign;
        });

        const betweenOneAndThree = diff.every((val) => {
            return Math.abs(val) <= 3 && val !== 0;
        });

        if (sameSign && betweenOneAndThree) {
            result++;
        }
    });

    return result;
};

const part2 = (input) => {
    let result = 0;

    input.trim().split("\n").forEach((line) => {
        const report = line.split(/\s+/);

        for (let i = 0; i < report.length; i++) {
            const subReport = report.slice(0, i).concat(report.slice(i + 1));

            const diff = [];

            for (let i = 0; i < subReport.length - 1; i++) {
                diff.push(parseInt(subReport[i]) - parseInt(subReport[i + 1]));
            }

            const sign = Math.sign(diff[0]);
            
            const sameSign = diff.every((val) => {
                return Math.sign(val) === sign;
            });

            const betweenOneAndThree = diff.every((val) => {
                return Math.abs(val) <= 3 && val !== 0;
            });

            if (sameSign && betweenOneAndThree) {
                result++;
                break;
            }
        }
    });

    return result;
};

export { part1, part2 };