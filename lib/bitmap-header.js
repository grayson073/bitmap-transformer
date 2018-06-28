const constants = require('./bitmap-constants');

module.exports = class BitmapHeader {
    constructor(buffer) {
        this.buffer = buffer;
        this.pixelOffset = this.buffer.readInt32LE(constants.PIXEL_OFFSET);
        this.bitsPerPixel = this.buffer.readInt16LE(constants.BITS_PER_PIXEL_OFFSET);
        this.fileSize = this.buffer.readInt32LE(constants.FILE_SIZE_OFFSET);
    }

};
