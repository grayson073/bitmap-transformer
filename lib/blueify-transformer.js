
function blueify(pixel) {
    const avg = parseInt((pixel.r + pixel.g + pixel.b) / 3);
    pixel.r = avg;
    pixel.g = avg;
    pixel.b = parseInt(avg * 1.5);
    return pixel;
}

module.exports = {
    blueify
};