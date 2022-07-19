import _ from 'lodash';

import fs from 'fs';
import path from 'path';

const examples = ['banner'];

console.log('Sandpack config factory 🏭');

examples.forEach(example => {
  let __dirname = path.join(example);

  const framworks = fs.readdirSync(__dirname);

  framworks.map(framwork => path.join(__dirname, framwork)).map(createConfig);
});

function createConfig(dirname) {
  let __dirname = path.join(dirname);

  const mapFileNameToCode = mapFileNameToCodeFactory(__dirname);
  const readAllFilesFromBlob = readAllFilesFromBlobFactory(mapFileNameToCode);

  try {
    const config = fs.readFileSync(
      path.join(__dirname, 'sandpack.config.json'),
      'utf8'
    );

    const packageJson = fs.readFileSync(
      path.join(__dirname, 'package.json'),
      'utf8'
    );

    const parsedPackage = JSON.parse(packageJson);
    const parsedConfig = JSON.parse(config);

    const { files } = parsedConfig;

    let expandedFiles = [];

    if (_.isArray(files)) {
      expandedFiles = files.reduce(mapFileNameToCode, {});
    } else {
      expandedFiles = readAllFilesFromBlob(path.join(__dirname, files));
    }

    const dirname = path.join(__dirname, '.sandpack');

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }

    const generated = {
      ...parsedConfig,
      files: expandedFiles,
      customSetup: {
        ...parsedConfig.customSetup,
        ...parsedPackage,
      },
    };

    const generatedPath = path.join(
      __dirname,
      '.sandpack',
      'sandpack.config.json'
    );

    fs.writeFileSync(generatedPath, JSON.stringify(generated));

    console.log(`created: ${generatedPath}`);
  } catch (err) {
    console.error(err.message);
  }
}

function mapFileNameToCodeFactory(__dirname) {
  return function mapFileNameToCode(fileMap, file) {
    if (_.isPlainObject(file)) {
      const { title } = file;

      const code = fs.readFileSync(path.join(__dirname, title), 'utf8');

      return {
        ...fileMap,
        [title]: code,
      };
    }
    const code = fs.readFileSync(path.join(__dirname, file), 'utf8');

    return {
      ...fileMap,
      [file]: code,
    };
  };
}

function readAllFilesFromBlobFactory(__dirname = '.') {
  const mapFileNameToCode = mapFileNameToCodeFactory('.');

  return function readAllFilesFromBlob(dirname = './src', files = []) {
    const directory = path.join(dirname);

    const fileNames = fs.readdirSync(directory);

    fileNames.forEach(file => {
      const absolute = path.join(directory, file);

      if (fs.statSync(absolute).isDirectory()) {
        readAllFilesFromBlob(absolute, files);
      } else {
        files.push(absolute);
      }
    });

    return files.map(fileName => `/${fileName}`).reduce(mapFileNameToCode, {});
  };
}
