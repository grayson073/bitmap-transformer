
function blueify(pixel) {
    const avg = parseInt((pixel.r + pixel.g + pixel.b) / 3);
    pixel.r = avg;
    pixel.g = avg;
    pixel.b = avg < 170 ? parseInt(avg * 1.5) : 255;
    return pixel;
}

module.exports = { blueify };