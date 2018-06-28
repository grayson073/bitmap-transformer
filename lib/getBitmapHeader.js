const constants = require('./bitmap-constants.js');
const readFrom = require('./read-from.js');



function getBitmapHeader(fileName) {
    return readFrom(fileName, 4, constants.PIXEL_OFFSET);

}

module.exports = getBitmapHeader;