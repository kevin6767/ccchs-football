// Function to generate working days (Monday to Friday) for the whole year
export const generateWorkingDaysForYear = (rosterId) => {
    const year = new Date().getFullYear()
    const workingDays = []

    // Iterate through each month (0 = January, 11 = December)
    for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate() // Get number of days in the month

        // Iterate through each day in the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day)
            const dayOfWeek = date.getDay()

            // Skip weekends (Saturday = 6, Sunday = 0)
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                workingDays.push({
                    day: day,
                    month: month,
                    rosterId: rosterId,
                    present: false, // Attendance is not yet taken, so 'present' is false
                })
            }
        }
    }

    return workingDays
}
