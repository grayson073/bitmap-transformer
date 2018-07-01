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
        const readStream = fs.createReadStream(this.filePath, {
            highWaterMark: 255
        });
        return new Promise((resolve, reject) => {
            const readSource = readFrom(this.filePath, this.header.pixelOffset, 0);
            const readOutput = readFile(outputFileName);
            return Promise.all([readSource, readOutput])
                .then(results => {
                    const sourceBuffer = results[0];
                    const outputBuffer = results[1];
                    for(let i = 0; i < sourceBuffer.length; i++) {
                        const byte = sourceBuffer.readUInt8(i);
                        outputBuffer.writeUInt8(byte, i);
                    }

                });
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