export const numberGenerator = () => {
    let lastNumber = 0;

    return () => {
        lastNumber += 1;
        return lastNumber;
    };
};
