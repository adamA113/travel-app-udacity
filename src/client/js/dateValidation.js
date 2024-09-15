// this function is to validate the date format which the user enter
const checkDateValidation = (tripDate) => {
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

    const match = tripDate.match(regex);
    if (!match) {
        return false;
    }

    const [, day, month, year] = match;

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    const date = new Date(yearNum, monthNum - 1, dayNum);

    return (
        date.getFullYear() === yearNum &&
        date.getMonth() === monthNum - 1 &&
        date.getDate() === dayNum
    );
}

export { checkDateValidation }