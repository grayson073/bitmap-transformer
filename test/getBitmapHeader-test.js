const assert = require('assert');
const getBitmapHeader = require('../lib/getBitmapHeader');
const { join } = require('path');



describe('Bitmap header getter', () => {

    const source = join(__dirname, 'test-bitmap.bmp');


    it('gets header data', () => {
        return getBitmapHeader(source)
            .then(header => {
                assert.equal(header.pixelOffset, 54);
                assert.equal(header.bitsPerPixel, 24);
                assert.equal(header.fileSize, 30054);
            });
    });


});