const fs = require('fs');

// https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = '0' + num;
  return num;
}

function textFileEncoding(data) {
  let fc = '';
  for (let i = 0; data.toString('binary').length >= i && i <= 4; i++) {
    fc += '' + pad(data.toString('binary').charCodeAt(i).toString(16), 2);
  }
  // Check if BOM is present
  // https://en.wikipedia.org/wiki/Byte_order_mark#Byte_order_marks_by_encoding
  if (fc.slice(0, 8) === 'fffe0000') return 'utf32le';
  if (fc.slice(0, 8) === '0000feff') return 'utf32be';
  if (fc.slice(0, 8) === 'dd736673') return 'utfebcdic';
  if (fc.slice(0, 8) === '84319533') return 'gb18030';
  if (fc.slice(0, 6) === '0efeff') return 'scsu';
  if (fc.slice(0, 6) === 'efbbbf') return 'utf8';
  if (fc.slice(0, 6) === '2B2F76') return 'utf7';
  if (fc.slice(0, 6) === 'f7644c') return 'utf1';
  if (fc.slice(0, 6) === 'fbee28') return 'bocu1';
  if (fc.slice(0, 4) === 'feff') return 'utf16be';
  if (fc.slice(0, 4) === 'fffe') return 'utf16le';
  return 'latin1';
}

module.exports = function textFileRead(path) {
  const defaultEncoding = 'binary'; // don't change
  let fileData = fs.readFileSync(path);

  let encoding = textFileEncoding(fileData);

  if (encoding === 'utf16be') {
    for (let i = 0; i < fileData.length / 2; i++) {
      let first = fileData[i * 2];
      fileData[i * 2] = fileData[i * 2 + 1];
      fileData[i * 2 + 1] = first;
    }
    encoding = 'utf16le';
  }

  if (encoding === 'utf32le') {
    let abort = false;
    const arr = [];
    for (let i = fileData.length - 1; i >= 0; i--) {
      if (fileData[i] + fileData[i - 1] === 0) {
        i--;
        i--;
        arr.unshift(fileData[i]);
        i--;
        arr.unshift(fileData[i]);
      } else {
        abort = true;
      }
      if (abort) break;
    }
    if (!abort) {
      fileData = Buffer.from(arr);
      encoding = 'utf16le';
    }
  }

  if (encoding === 'utf32be') {
    let abort = false;
    const arr = [];
    for (let i = fileData.length - 1; i >= 0; i--) {
      if (fileData[i - 2] + fileData[i - 3] === 0) {
        arr.unshift(fileData[i - 1]);
        arr.unshift(fileData[i]);
        i--;
        i--;
        i--;
      } else {
        abort = true;
      }
      if (abort) break;
    }
    if (!abort) {
      fileData = Buffer.from(arr);
      encoding = 'utf16le';
    }
  }

  if (['latin1', 'utf16le', 'utf8'].includes(encoding) && encoding !== defaultEncoding) {
    fileData = fileData.toString(encoding);
  } else if (encoding === defaultEncoding) {
    // nothing file is already in correct format
  } else {
    throw new Error('Unhandled format ' + encoding);
  }
  if (encoding === 'latin1') {
    return fileData;
  } else {
    // remove the bom
    return fileData.slice(1);
  }
};
