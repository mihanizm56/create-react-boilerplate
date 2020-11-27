const path = require('path');
const { writeFile } = require('./fs-promises');

module.exports.additionalPatchPackageJson = async modification => {
  if (modification !== 'gatsby') {
    return;
  }

  const packageJsonFile = require(path.join(process.cwd(), 'package.json')); // eslint-disable-line

  const { babel, ...restPackageJson } = packageJsonFile;

  await writeFile(
    path.join(process.cwd(), 'package.json'),
    JSON.stringify(restPackageJson, null, 2),
    'utf8',
  );
};
