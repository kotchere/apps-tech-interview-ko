export const toHoursAndMinutes = (min) => {
    if(min < 60) return min + 'm'
    const hours = (min / 60)
    const rhours = Math.floor(hours)
    const minutes = (hours - rhours) * 60
    const rminutes = Math.round(minutes)
    if(rminutes == 0) return rhours + 'h'
    return rhours + 'h ' + rminutes + 'm'
}