export const hexToRgb = (hex, opacity = 1) => {
    const rgb_arr = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))
    return 'rgba(' + rgb_arr.join(',') + ',' + opacity + ')'
}