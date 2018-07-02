const fs = require('fs');
const { readFile } = require('fs').promises;
const readFrom = require('./read-from');
const getBitmapHeader = require('./getBitmapHeader.js');

class StreamingBitmapTransformer {
    constructor(filePath, header) {
        this.filePath = filePath;
        this.header = header;
    }

    transform(transformation, outputFileName) {
        const writeStream = fs.createWriteStream(outputFileName);
        readFrom(this.filePath, this.header.pixelOffset, 0)
            .then(buffer => {
                writeStream.write(buffer);
            });
        const readStream = fs.createReadStream(this.filePath, {
            highWaterMark: 255,
            start: this.header.pixelOffset,
            end: this.header.fileSize
        });
        return new Promise((resolve, reject) => {
            readStream.on('data', chunk => {
                const pixel = {};
                
                for(let i = 0; i < chunk.length; i += 3) {
                    pixel.r = chunk.readUInt8(i + 2);
                    pixel.g = chunk.readUInt8(i + 1);
                    pixel.b = chunk.readUInt8(i);
                    transformation(pixel);
                    chunk.writeUInt8(pixel.b, i);
                    chunk.writeUInt8(pixel.g, i + 1);
                    chunk.writeUInt8(pixel.r, i + 2);
                }

                writeStream.write(chunk);
            });

            readStream.on('end', () => {
                writeStream.end(resolve);
            });

            readStream.on('error', reject);
        });      
    }
}

StreamingBitmapTransformer.create = function(bitmapFilePath) {
    return getBitmapHeader(bitmapFilePath)
        .then(bitmapHeader => {
            return new StreamingBitmapTransformer(bitmapFilePath, bitmapHeader);
        });
};

module.exports = StreamingBitmapTransformer;