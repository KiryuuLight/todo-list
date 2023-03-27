export const idGenerator = () => {
    let lastNumber = 0;

    return () => {
        lastNumber += 1;
        return lastNumber;
    };
};
