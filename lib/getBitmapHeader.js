const constants = require('./bitmap-constants.js');
const readFrom = require('./read-from.js');



function getBitmapHeader(fileName) {
    const headerData = {};
    return readFrom(fileName, 4, constants.PIXEL_OFFSET)
        .then(buffer => {
            headerData.pixelOffset = buffer.readInt32LE(0);
            return readFrom(fileName, headerData.pixelOffset, 0);
        })
        .then(header => {
            headerData.fileSize = header.readInt32LE(constants.FILE_SIZE_OFFSET);
            headerData.bitsPerPixel = header.readInt16LE(constants.BITS_PER_PIXEL_OFFSET);
            return headerData;
        });

}

module.exports = getBitmapHeader;