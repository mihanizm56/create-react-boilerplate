const path = require('path');
const { writeFile } = require('./fs-promises');

module.exports.replaceEmptyPackageJsonFields = async () => {
  const packageJsonFile = require(path.join(process.cwd(), 'package.json')); // eslint-disable-line

  const formattedPackageJsonFile = Object.keys(packageJsonFile).reduce(
    (acc, fieldName) => {
      const fieldValue = acc[fieldName];

      if (
        typeof fieldValue === 'object' &&
        Object.keys(fieldValue).length === 0
      ) {
        delete acc[fieldName];
      }

      return acc;
    },
    packageJsonFile,
  );

  await writeFile(
    path.join(process.cwd(), 'package.json'),
    JSON.stringify(formattedPackageJsonFile, null, 2),
    'utf8',
  );
};
