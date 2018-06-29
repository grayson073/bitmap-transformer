const fs = require('fs');
const readFrom = require('./read-from');
const getBitmapHeader = require('./getBitmapHeader.js');

class StreamingBitmapTransformer {
    constructor(filePath, header) {
        this.filePath = filePath;
        this.header = header;
    }

    transform(transformation, outputFileName) {
        // const writeStream = fs.createWriteStream(outputFileName);
        // const readStream = fs.createReadStream(this.filePath, {
        //     highWaterMark: 255
        // });
        // return new Promise((resolve, reject) => {

        return readFrom(this.filePath, this.header.pixelOffset, 0)
            .then(buffer => {
                console.log('BUFFER', buffer);
                outputFileName = buffer;


                console.log('OUTPUT FILE NAME', outputFileName)

            })
               
    }
}

StreamingBitmapTransformer.create = function(bitmapFilePath) {
    return getBitmapHeader(bitmapFilePath)
        .then(bitmapHeader => {
            return new StreamingBitmapTransformer(bitmapFilePath, bitmapHeader);
        });
};

module.exports = StreamingBitmapTransformer;