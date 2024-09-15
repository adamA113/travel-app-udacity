// this function is to chcek is the trip date is within 16 days max from current date
const checkDateRange = (tripDate) => {
    const today = new Date();
    // Set time of today to 00:00:00 to ignore the time portion
    today.setHours(0, 0, 0, 0);

    // Create a future date 16 days from today
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 16);

    // Parse the input date and set its time to 00:00:00 to ignore time
    const inputDate = new Date(tripDate);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate >= today && inputDate <= futureDate;
}

export { 
    checkDateRange,
 }