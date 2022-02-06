# **textfilereader**  

## description  

Lightweight package to read and use textfiles not having to handle things related to encoding.

## Reason for existence

As fs.readFile is only supporting latin1, utf8 and utf16le and don't autodetect, nor autoremove the BOM, I really needed this. So I created this library during a Friday evening.

## Future

Currently only synced reading are supported, but I might add asynchronous support int the future, ether if I need it myself or if someone as (or even pay 10-50€).  
But what I really hope for is that node team would get their shit together and add support for the formats this package support, it's not like it's rocket science.

## Features

It detects fileformat using the BOM,
It removes the BOM  

### Supported encodings

* utf8 - Autodetected, read using standard Buffer.toString('utf8')  
* utf16le - Autodetected, read using standard Buffer.toString('utf16le')  
* utf16be - Autodetected, converted to utf16le the read using standard Buffer.toString('utf16le')  
* utf32le - Autodetected, trying to convert to utf16le the read using standard Buffer.toString('utf16le'), cast error if char that can't be converted is found.  
* utf32be - Autodetected, trying to convert to utf16le the read using standard Buffer.toString('utf16le'), cast error if char that can't be converted is found.  
* latin1 - Everything else is considered to be latin1.

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
