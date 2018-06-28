const BitmapHeader = require('./bitmap-header');

module.exports = class PaletteTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {
        for(let i = this.header.colorTable; i < this.header.pixelOffset; i += 4) {

            const pixel = {
                r: this.buffer.readUInt8(i + 2),
                g: this.buffer.readUInt8(i + 1),
                b: this.buffer.readUInt8(i)
            };

            fn(pixel);
            
            this.buffer.writeUInt8(pixel.b, i);
            this.buffer.writeUInt8(pixel.g, i + 1);
            this.buffer.writeUInt8(pixel.r, i + 2);
        }
    }
};