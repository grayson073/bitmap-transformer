const BitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(transformation) {
        for(let i = this.header.pixelOffset; i < this.header.fileSize; i += (this.header.bitsPerPixel / 8)) {

            const pixel = {
                r: this.buffer.readUInt8(i + 2),
                g: this.buffer.readUInt8(i + 1),
                b: this.buffer.readUInt8(i)
            };

            transformation(pixel);

            this.buffer.writeUInt8(pixel.b, i);
            this.buffer.writeUInt8(pixel.g, i + 1);
            this.buffer.writeUInt8(pixel.r, i + 2);
        }
    }
};