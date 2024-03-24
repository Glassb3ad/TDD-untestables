const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas(today) {
    const christmasDay = new Date(today.getFullYear(), 12 - 1, 25);
    if (today.getTime() > christmasDay.getTime()) {
        christmasDay.setFullYear(now.getFullYear() + 1);
    }
    const diffMillis = christmasDay.getTime() - today.getTime();
    return Math.floor(diffMillis / millisPerDay) - 1;
}