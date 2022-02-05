const textFileRead = require('./index');
const fs = require('fs');
let t;
  
console.log('latin1');
try {
  t = textFileRead('latin1.txt');
  console.log(t);
} catch (error) {
  console.log('Error: ' + error.message);
}
console.log('\nutf8');
try {
  t = textFileRead('utf8.txt');
  console.log(t);
} catch (error) {
  console.log('Error: ' + error.message);
}
console.log('\nutf16le');
try {
  t = textFileRead('utf16le.txt');
  console.log(t);
} catch (error) {
  console.log('Error: ' + error.message);
}
console.log('\nutf16be');
try {
  t = textFileRead('utf16be.txt');
  console.log(t);
} catch (error) {
  console.log('Error: ' + error.message);
}
console.log('\nutf7');
try {
  t = textFileRead('utf7.txt');
  console.log(t);
} catch (error) {
  console.log('Error: ' + error.message);
}
console.log('\nscsu');
try {
  t = textFileRead('scsu.txt');
  console.log(t);
} catch (error) {
  console.log('Error: ' + error.message);
} 
console.log('\nutf32le');
try {
  t = textFileRead('utf32le.txt');
  console.log(t);
} catch (error) {
  console.log('Error: ' + error.message);
}
console.log('\nutf32be');
try {
  t = textFileRead('utf32be.txt');
  console.log(t);
} catch (error) {
  console.log('Error: ' + error.message);
}
