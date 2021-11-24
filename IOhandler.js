/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: Nov 23, 2021
 * Author: Andrew Graystone
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  fs.createReadStream(pathIn)
  .pipe(unzipper.Extract({ path: pathOut }))
  .promise()
  .then( () => console.log('done'), e => console.log('error', e));
};

unzip('myfile.zip', 'myfile')

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
// const grayScale = (pathIn, pathOut) => {
//   fs.createReadStream("in.png")
//   .pipe(
//     new PNG()
//   )
//   .on("parsed", function () {
//     for (var y = 0; y < this.height; y++) {
//       for (var x = 0; x < this.width; x++) {
//         var idx = (this.width * y + x) << 2;
 
//         // invert color
//         this.data[idx] = 255 - this.data[idx];
//         this.data[idx + 1] = 255 - this.data[idx + 1];
//         this.data[idx + 2] = 255 - this.data[idx + 2];
//         // add these together and divide by 3 and give each pixel that colour
 
//         // and reduce opacity
//         this.data[idx + 3] = this.data[idx + 3] >> 1;
//       }
//     }
 
//     this.pack().pipe(fs.createWriteStream("out.png"));
//   });
// };

module.exports = {
  unzip,
  readDir,
  // grayScale,
};
