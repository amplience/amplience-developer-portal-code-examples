import _ from 'lodash';

import path from 'path';
import fs from 'fs/promises';

import { existsSync } from 'fs';

const examples = ['banner'];

console.log('Sandpack config factory 🏭');

await Promise.all(examples.map(createExample));

async function createExample(example) {
  let __dirname = path.join(example);

  const frameworks = await fs.readdir(__dirname);

  await Promise.all(
    frameworks.map(async framwork => {
      const dir = path.join(__dirname, framwork);

      return createConfig(dir);
    })
  );
}

async function createConfig(basePath) {
  let __dirname = path.join(basePath);

  const mapFileNameToCode = mapFileNameToCodeFactory(__dirname);
  const readAllFilesFromBlob = readAllFilesFromBlobFactory();

  const [config, packageJson] = await Promise.all([
    fs.readFile(path.join(__dirname, 'sandpack.config.json'), 'utf8'),
    fs.readFile(path.join(__dirname, 'package.json'), 'utf8'),
  ]);

  const parsedPackage = JSON.parse(packageJson);
  const parsedConfig = JSON.parse(config);

  const { files } = parsedConfig;

  let expandedFiles = [];

  if (_.isArray(files)) {
    expandedFiles = await files.reduce(mapFileNameToCode, Promise.resolve({}));
  } else {
    expandedFiles = await readAllFilesFromBlob(path.join(__dirname, files));
  }

  const dirname = path.join(__dirname, '.sandpack');

  if (!existsSync(dirname)) {
    await fs.mkdir(dirname);
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

  await fs.writeFile(generatedPath, JSON.stringify(generated));

  console.log(`created: ${generatedPath}`);
}

function mapFileNameToCodeFactory(__dirname) {
  return async function mapFileNameToCode(fileMapPromise, file) {
    const fileMap = await fileMapPromise;

    if (_.isPlainObject(file)) {
      const { title } = file;

      const code = await fs.readFile(path.join(__dirname, title), 'utf8');

      return {
        ...fileMap,
        [title]: code,
      };
    }
    const code = await fs.readFile(path.join(__dirname, file), 'utf8');

    return {
      ...fileMap,
      [file]: code,
    };
  };
}

function readAllFilesFromBlobFactory() {
  const mapFileNameToCode = mapFileNameToCodeFactory('.');

  return async function readAllFilesFromBlob(dirname = './src', files = []) {
    const directory = path.join(dirname);

    const fileNames = await fs.readdir(directory);

    await Promise.all(
      fileNames.map(async file => {
        const absolute = path.join(directory, file);
        const stats = await fs.stat(absolute);

        if (stats.isDirectory()) {
          await readAllFilesFromBlob(absolute, files);
        } else {
          files.push(absolute);
        }
      })
    );

    const remapedPaths = files.map(fileName => `/${fileName}`);

    return remapedPaths.reduce(mapFileNameToCode, Promise.resolve({}));
  };
}
