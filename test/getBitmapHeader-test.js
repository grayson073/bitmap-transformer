const assert = require('assert');
const getBitmapHeader = require('../lib/getBitmapHeader');
const { join } = require('path');



describe.only('Bitmap header getter', () => {

    const source = join(__dirname, 'test-bitmap.bmp');


    it('gets header data', () => {
        return getBitmapHeader(source)
            .then(buffer => {
                assert.equal(buffer.readInt32LE(0), 54);
            });
    });


});