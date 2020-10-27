module.exports.getArrayOfCopiedFiles = ({ projectFolder, pathToExecute }) => [
  {
    from: projectFolder,
    to: pathToExecute,
  },
];
