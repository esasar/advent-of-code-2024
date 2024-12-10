const part1 = (input) => {
    const values = input.split("\n").map((line) =>  {
        const [key, value] = line.split(":");
        return [Number(key), value.trim().split(" ").map(Number)];
    });

    const operations = [
        (target, value) => (target % value === 0 ? target / value : -1), 
        (target, value) => target - value
    ];

    const isValid = (target, values) => {
        if (target < 0) return false;
        if (values.length === 1)  {
            if (target === values[0]) {
                return true;
            } else {
                return false;
            }
        };
        
        return operations.some((operation) => {
            return isValid(operation(target, values.at(-1)), values.slice(0, -1));
        });
    }

    const result = values.reduce((acc, [target, values]) => {
        if (isValid(target, values)) {
            return acc + target;
        }
        return acc;
    }, 0);
    
    return result;
}

const part2 = (input) => {
    const values = input.split("\n").map((line) =>  {
        const [key, value] = line.split(":");
        return [Number(key), value.trim().split(" ").map(Number)];
    });

    const operations = [
        (target, value) => (target % value === 0 ? target / value : -1), 
        (target, value) => target - value,
        (target, value) => {
            const diff = target - value;
            if (diff < 0) return false;
            const valueNumberOfDigits = value.toString().length;
            const valueMagnitude = 10 ** valueNumberOfDigits;
            return diff % valueMagnitude === 0 ? diff / valueMagnitude : -1;
        }
    ];

    const isValid = (target, values) => {
        if (target < 0) return false;
        if (values.length === 1)  {
            if (target === values[0]) {
                return true;
            } else {
                return false;
            }
        };
        
        return operations.some((operation) => {
            return isValid(operation(target, values.at(-1)), values.slice(0, -1));
        });
    }

    const result = values.reduce((acc, [target, values]) => {
        if (isValid(target, values)) {
            return acc + target;
        }
        return acc;
    }, 0);
    
    return result;
}

export { part1, part2 };