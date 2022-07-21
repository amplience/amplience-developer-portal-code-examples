import _ from 'lodash';

import path from 'path';
import fs from 'fs/promises';

import { existsSync } from 'fs';

const examples = await fs.readdir(path.join('./examples'));

console.log('Sandpack config factory 🏭');

await Promise.all(examples.map(createExample));

async function createExample(example) {
  let dirname = path.join('./examples', example);

  const frameworks = await fs.readdir(dirname);

  await Promise.all(
    frameworks.map(async framwork => {
      const dir = path.join(dirname, framwork);

      return createConfig(dir);
    })
  );
}

async function createConfig(basePath) {
  let dirname = path.join(basePath);

  const mapFileNameToCode = mapFileNameToCodeFactory(dirname);
  const readAllFilesFromBlob = readAllFilesFromBlobFactory(
    dirname,
    mapFileNameToCode
  );

  const [config, packageJson] = await Promise.all([
    fs.readFile(path.join(dirname, 'sandpack.config.json'), 'utf8'),
    fs.readFile(path.join(dirname, 'package.json'), 'utf8'),
  ]);

  const parsedPackage = JSON.parse(packageJson);
  const parsedConfig = JSON.parse(config);

  const { files } = parsedConfig;

  let expandedFiles = [];

  if (_.isArray(files)) {
    expandedFiles = await files.reduce(mapFileNameToCode, Promise.resolve({}));
  } else {
    expandedFiles = await readAllFilesFromBlob([], path.join(files));
  }

  const sandpackDirname = path.join(dirname, '.sandpack');

  if (!existsSync(sandpackDirname)) {
    await fs.mkdir(sandpackDirname);
  }

  const generated = {
    ...parsedConfig,
    files: expandedFiles,
    customSetup: {
      ...parsedConfig.customSetup,
      ...parsedPackage,
    },
  };

  const generatedPath = path.join(dirname, '.sandpack', 'sandpack.config.json');

  await fs.writeFile(generatedPath, JSON.stringify(generated));

  console.log(`created: ${generatedPath}`);
}

function mapFileNameToCodeFactory(dirname) {
  return async function mapFileNameToCode(fileMapPromise, file) {
    const fileMap = await fileMapPromise;

    if (_.isPlainObject(file)) {
      const { title } = file;

      const code = await fs.readFile(path.join(dirname, title), 'utf8');

      return {
        ...fileMap,
        [title]: code,
      };
    }
    const code = await fs.readFile(path.join(dirname, file), 'utf8');

    return {
      ...fileMap,
      [file]: code,
    };
  };
}

function readAllFilesFromBlobFactory(dirname, mapFileNameToCode) {
  return async function readAllFilesFromBlob(files = [], ...dirnames) {
    const directory = path.join(dirname, ...dirnames);

    const fileNames = await fs.readdir(directory);

    await Promise.all(
      fileNames.map(async file => {
        const absolute = path.join(directory, file);
        const stats = await fs.stat(absolute);

        if (stats.isDirectory()) {
          await readAllFilesFromBlob(files, ...dirnames, file);
        } else {
          files.push(path.join(...dirnames, file));
        }
      })
    );

    return files.reduce(mapFileNameToCode, Promise.resolve({}));
  };
}
