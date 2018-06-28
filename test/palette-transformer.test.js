
const assert = require('assert');
const { readFile } = require('fs').promises;
const PaletteTransformer = require('../lib/palette-transformer');
const { invert } = require('../lib/invert-transformer');
const { grayscale } = require('../lib/grayscale-transformer');
const { blueify } = require('../lib/blueify-transformer');
const { join } = require('path');

describe('palette file transformer', () => {

    const source = join(__dirname, 'palette-test-bitmap.bmp');
    
    let buffer = null;
    beforeEach(() => {
        return readFile(source)
            .then(b => buffer = b);
    });

    // "pinning" test, or "snapshot" test
    it('test INVERT transform', () => {
        const bitmap = new PaletteTransformer(buffer);

        bitmap.transform(invert);

        return readFile('./test/palette-invert-expected.bmp')
            .then(expected => {
                assert.deepEqual(bitmap.buffer, expected);
            });

        // return fs.writeFileSync('./test/palette-invert-expected.bmp', bitmap.buffer);
    });
});