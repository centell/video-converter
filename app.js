const fs = require('fs');
const path = require('path');
const app = require('shelljs');

const changeFilenames = (targetDirectory, searchValue, replaceValue) => {
  const filenames = [];
  fs.readdirSync(targetDirectory)
    .filter(filename => {
      return path.parse(filename).ext === '.ts' || path.parse(filename).ext === '.mp4';
    })
    .forEach(filename => {
      const newFilename = filename.replace(searchValue, replaceValue);
      fs.rename(`${targetDirectory}/${filename}`,`${targetDirectory}/${newFilename}`, (err) => {
        if (err) console.error(err);
      });
      filenames.push(path.parse(newFilename).name);
    })
  return filenames;
}

const filenames = changeFilenames(`${__dirname}/videos/inputs`, / /gi, '_')
console.log(filenames);

for (let i = 0, l = filenames.length; i < l; i += 1) {
  const filename = filenames[i];
  app.exec(`ffmpeg -i videos/inputs/${filename}.ts -acodec copy -vcodec copy videos/outputs/${filename}.mp4`);
}

changeFilenames(`${__dirname}/videos/inputs`, /_/gi, ' ')
changeFilenames(`${__dirname}/videos/outputs`, /_/gi,' ')
