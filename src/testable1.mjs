const millisPerDay = 24 * 60 * 60 * 1000;

export function daysBetween(startDate, endDate) {
    const diffMillis = endDate.getTime() - startDate.getTime();
    return Math.floor(diffMillis / millisPerDay);
}

export function daysUntilChristmas(today) {
    const christmasDay = new Date(today.getFullYear(), 12 - 1, 25);
    if (today.getTime() > christmasDay.getTime()) {
        christmasDay.setFullYear(today.getFullYear() + 1);
    }
    return daysBetween(today, christmasDay)
}