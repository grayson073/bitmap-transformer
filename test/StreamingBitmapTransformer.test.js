const { join } = require('path');
const StreamingBitmapTransformer = require('../lib/StreamingBitmapTransformer');
const { unlink, readFile } = require('fs').promises;
const { invert } = require('../lib/invert-transformer');
const assert = require('assert');

describe.only('streaming bitmap transformer', () => {
    const source = join(__dirname, 'test-bitmap.bmp');
    const invertedBitmap = './test/stream-invert.bmp';

    beforeEach(() => {
        return unlink(invertedBitmap)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    });
    
    it('transforms an image', () => {
        StreamingBitmapTransformer.create(source)
            .then(streamingTransformer => {
                return streamingTransformer.transform(invert, invertedBitmap);
            })
            .then(() => {
                const actual = readFile(invertedBitmap);
                const expected = readFile('./test/inverted-expected.bmp');
                assert.deepEqual(actual, expected);
            });
    });
});