
function grayscale(pixel) {
    const avg = parseInt((pixel.r + pixel.g + pixel.b) / 3);
    pixel.r = avg;
    pixel.g = avg;
    pixel.b = avg;
    return pixel;
}

module.exports = {
    grayscale
};