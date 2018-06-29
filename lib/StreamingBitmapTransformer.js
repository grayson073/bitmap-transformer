const fs = require('fs');
const readFrom = require('./read-from');
const getBitmapHeader = require('./getBitmapHeader.js');

class StreamingBitmapTransformer {
    constructor(filePath, header) {
        this.filePath = filePath;
        this.header = header;
    }

    transform(transformation, outputFileName) {
        const writeStream = fs.createWriteStream(outputFileName);
        const readStream = fs.createReadStream(this.filePath, {
            highWaterMark: 255
        });

        return new Promise((resolve, reject) => {

            return readFrom(this.filePath, this.header.pixelOffset, 0)
                .then(buffer => {
                    for(let i = 0; i < this.header.pixelOffset; i++) {
                        const byte = buffer.readUInt8(i);
                        outputFileName.writeUInt8(i);
                    }
                })
                .then(readStream.on('data', chunk => {
                    // for(let i = 0; i < chunk.length, i+= 3) {
                    //     const pixel = {
                    //         r: this.buffer.readUInt8(i + 2),
                    //         g: this.buffer.readUInt8(i + 1),
                    //         b: this.buffer.readUInt8(i)
                    //     };

                    //     transformation(pixel);

                    //     this.buffer.writeUInt8(pixel.b, i);
                    //     this.buffer.writeUInt8(pixel.g, i + 1);
                    //     this.buffer.writeUInt8(pixel.r, i + 2);
                    }
                }))
        });
            
    }
}

StreamingBitmapTransformer.create = function(bitmapFilePath) {
    return getBitmapHeader(bitmapFilePath)
        .then(bitmapHeader => {
            return new StreamingBitmapTransformer(bitmapFilePath, bitmapHeader)
        });
};

module.exports = StreamingBitmapTransformer;