const constants = require('./bitmap-constants');

module.exports = class BitmapHeader {
    constructor(buffer) {
        this.buffer = buffer;
        this.pixelOffset = this.findPixelOffset(constants.PIXEL_OFFSET);
        this.bitsPerPixel = this.findBitsPerPixel(constants.BITS_PER_PIXEL_OFFSET);
        this.fileSize = this.findFileSize(constants.FILE_SIZE_OFFSET);

    }

    findPixelOffset(offset) {
        return this.buffer.readInt32LE(offset);
    }

    findBitsPerPixel(offset) {
        return this.buffer.readInt16LE(offset);
    }

    findFileSize(offset) {
        return this.buffer.readInt32LE(offset);
    }
};
