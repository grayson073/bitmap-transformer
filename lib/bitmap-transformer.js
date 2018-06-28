const BitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {
        for(let i = this.header.pixelOffset; i < this.buffer.length; i += 3) {
            const b = this.buffer.readInt8(i);
            const g = this.buffer.readInt8(i + 1);
            const r = this.buffer.readInt8(i + 2);

            const pixel = {
                r: r,
                g: g,
                b: b
            };
            fn(pixel);
            this.buffer.writeInt8(pixel.b.toString(16), i);
            this.buffer.writeInt8(0x4, i + 1);
            this.buffer.writeInt8(0x4, i + 2);
            // fn(pixel);
            // this.buffer.writeInt8(Number(pixel.b).toString(16), i);
            // this.buffer.writeInt8(Number(pixel.g).toString(16), i + 1);
            // this.buffer.writeInt8(Number(pixel.r).toString(16), i + 2);
        }
        // this is a guide to what needs to happen
        // not a recipe

        // you have access to the data you need:
        // this.buffer
        // this.header.pixelOffset
        // this.header.bitsPerPixel
        // this.header.fileSize

        // Find the right place (offset) in the buffer from which to start your loop.
        // Keep in mind that the loop will need to "step" by something other than 1.
        // For each loop:
        // 1. Read the individual color values into a color object
        // 1. Pass to the transformation function, which returns a transformed color object
        // 1. Write the transformed color values back into the buffer
    }
};