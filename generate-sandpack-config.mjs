import _ from 'lodash';

import fs from 'fs';
import path from 'path';

let __dirname = path.resolve(path.dirname(''));

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
    expandedFiles = readAllFilesFromBlob(files);
  }

  const dirname = path.join(__dirname, 'sandpack');

  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }

  fs.writeFileSync(
    path.join(__dirname, 'sandpack', 'sandpack.config.json'),
    JSON.stringify({
      ...parsedConfig,
      files: expandedFiles,
      customSetup: {
        ...parsedConfig.customSetup,
        ...parsedPackage,
      },
    })
  );
} catch (err) {
  console.error(err.message);
}

function mapFileNameToCode(fileMap, file) {
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
}

function readAllFilesFromBlob(dirname = './src', files = []) {
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
}
