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
  fs = require("fs").promises,
  createReadStream = require('fs').createReadStream,
  createWriteStream = require('fs').createWriteStream,
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
  return createReadStream(pathIn)
  .pipe(unzipper.Extract({ path: pathOut }))
  .promise()
  
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  const files = fs.readdir(dir)
  .then((files) => {
    let pngFiles = []
    files.forEach(file => {
      if (file.includes('.png')) {
        pngFiles.push(file)
      }
    })
    console.log(pngFiles)
  })
  .catch((err) => {console.log(err)})
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  createReadStream(pathIn)
  .pipe(
    new PNG()
    )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;
 
        // grayscale
        const greyValue = (this.data[idx] + this.data[idx+1] + this.data[idx+2])/3
        this.data[idx] = greyValue
        this.data[idx+1] = greyValue
        this.data[idx+2] = greyValue
      }
    }
 
    this.pack().pipe(createWriteStream(pathOut));
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
