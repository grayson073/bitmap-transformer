const assert = require('assert');
const constants = require('../lib/bitmap-constants');
const BitmapHeader = require('../lib/bitmap-header');
const { readFile } = require('fs').promises;
const { join } = require('path');

describe('palette header', () => {

    const source = join(__dirname, 'palette-test-bitmap.bmp');
    

    let buffer = null;
    beforeEach(() => {
        return readFile(source)
            .then(b => buffer = b);
    });

    it('has correct specs', () => {
        assert.ok(constants.PIXEL_OFFSET);
        assert.ok(constants.BITS_PER_PIXEL_OFFSET);
        assert.ok(constants.FILE_SIZE_OFFSET);
        assert.ok(constants.COLOR_TABLE_OFFSET);
    });

    it('parses header data', () => {
        const header = new BitmapHeader(buffer);
        assert.equal(header.pixelOffset, 1078);
        assert.equal(header.bitsPerPixel, 8);
        assert.equal(header.fileSize, 11078);
        assert.equal(header.colorTable, 54);
    });
});