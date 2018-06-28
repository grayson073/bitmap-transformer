const assert = require('assert');
const { readFile } = require('fs').promises;
const BitmapTransformer = require('../lib/bitmap-transformer');
const { invert } = require('../lib/invert-transformer');
const { join } = require('path');

describe('bitmap file transformer', () => {

    const source = join(__dirname, 'test-bitmap.bmp');
    
    let buffer = null;
    beforeEach(() => {
        return readFile(source)
            .then(b => buffer = b);
    });

    // "pinning" test, or "snapshot" test
    it('test whole transform', () => {
        // Use the BitmapTransformer class, 
        // passing in the buffer from the file read
        const bitmap = new BitmapTransformer(buffer);

        // Call .transform(), which will modify the buffer.
        // With this api, you pass in a transformation function (we are testing with "invert")
        bitmap.transform(invert);

        // After above step, the buffer has been modified
        // and is accessible via bitmap.buffer.

        // Read the output file we saved earlier as the "standard" expected output file.
        return readFile('./test/inverted-expected.bmp')
            .then(expected => {
                assert.deepEqual(bitmap.buffer, expected);
            });

        // If you don't have a standard file yet, or need to update or are adding new test,
        // you can write it out by commenting above code block, and uncomment code below 
        // that writes the file and then visually inspect the file for correctness.

        // return fs.writeFileSync('./test/inverted-expected.bmp', bitmap.buffer);
    });
});