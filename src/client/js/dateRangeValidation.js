// this function is to chcek is the trip date is within 16 days max from current date
const checkDateRange = (tripDate) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 16);

    const inputDate = new Date(dataFormat(tripDate));

    return inputDate >= today && inputDate <= futureDate;
}

// this function is to convert the date format to YYYY-MM-DD
const dataFormat = (tripDate) => {
    const [day, month, year] = tripDate.split('/');
    const formattedDay = day?.padStart(2, '0');
    const formattedMonth = month?.padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
}

export { 
    checkDateRange,
    dataFormat
 }