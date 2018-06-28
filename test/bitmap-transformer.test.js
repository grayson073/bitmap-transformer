const assert = require('assert');
const { readFile } = require('fs').promises;
const BitmapTransformer = require('../lib/bitmap-transformer');
const { invert } = require('../lib/invert-transformer');
const { grayscale } = require('../lib/grayscale-transformer');
const { blueify } = require('../lib/blueify-transformer');
const { join } = require('path');

describe('bitmap file transformer', () => {

    const source = join(__dirname, 'test-bitmap.bmp');
    
    let buffer = null;
    beforeEach(() => {
        return readFile(source)
            .then(b => buffer = b);
    });

    it('test INVERT transform', () => {
        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(invert);

        return readFile('./test/inverted-expected.bmp')
            .then(expected => {
                assert.deepEqual(bitmap.buffer, expected);
            });
    });

    it('test GRAYSCALE transform', () => {
        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(grayscale);

        return readFile('./test/grayscale-expected.bmp')
            .then(expected => {
                assert.deepEqual(bitmap.buffer, expected);
            });

    });

    it('test BLUEIFY transform', () => {
        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(blueify);

        return readFile('./test/blueify-expected.bmp')
            .then(expected => {
                assert.deepEqual(bitmap.buffer, expected);
            });

    });
});