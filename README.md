As fs.readFile is only suporting latin1, utf8 and utf16le and don't autodetect, nor autoremove the BOM. 
So I created this library. Currently only synced reading are supported, but might support asyncronus

It detects fileformat using the BOM,  

utf8 - Autodetected, read using standard Buffer.toString('utf8')  
utf16le - Autodetected, read using standard Buffer.toString('utf16le')  
utf16be - Autodetected, converted to utf16le the read using standard Buffer.toString('utf16le')  
utf32le - Autodetected, trying to convert to utf16le the read using standard Buffer.toString('utf16le'), cast error if char that can't be converted is found.  
utf32be - Autodetected, trying to convert to utf16le the read using standard Buffer.toString('utf16le'), cast error if char that can't be converted is found.
Everything else is considered to be latin1.

Common way to read file.

    const fs = require('fs');
    try {
        t = fs.readFileSync('latin1.txt');
        console.log(t);
    } catch (error) {
        console.log('Error: ' + error.message);
    }

Using this module way to read file.

    const tr = require('textfilereader');
    try {
        t = tr('latin1.txt');
        console.log(t);
    } catch (error) {
        console.log('Error: ' + error.message);
    }

