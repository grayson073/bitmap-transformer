const { join } = require('path');
const StreamingBitmapTransformer = require('../lib/StreamingBitmapTransformer');
const { unlink } = require('fs').promises;
const fs = require('fs');
const { invert } = require('../lib/invert-transformer');
const assert = require('assert');

describe('streaming bitmap transformer', () => {
    const source = join(__dirname, 'test-bitmap.bmp');
    const invertedBitmap = './test/stream-invert.bmp';

    beforeEach(() => {
        return unlink(invertedBitmap)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    });

    beforeEach(() => {

    });
    
    it('transforms an image', () => {
        return StreamingBitmapTransformer.create(source)
            .then(streamingTransformer => {
                return streamingTransformer.transform([invert, invert, invert], invertedBitmap)
                    .then(() => {
                        const actual = fs.readFileSync(invertedBitmap);
                        const expected = fs.readFileSync('./test/inverted-expected.bmp');
                        assert.deepEqual(actual, expected);
                    })
                    .catch(err => {
                        throw err;
                    });
            });
    });
});