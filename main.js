/*
 * Project:
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

IOhandler.unzip('myfile.zip', 'myfile')
.then((dir) => IOhandler.readDir('myfile'))
.then((files) => IOhandler.grayScale('myfile/in.png', 'myfile/out.png'))
.catch((err) => {console.log(err)})