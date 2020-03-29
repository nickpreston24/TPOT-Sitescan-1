const fs = require("fs");
const path = require("path");

const isDirectory = filePath => fs.statSync(filePath).isDirectory();
const isFile = filePath => fs.statSync(filePath).isFile();

const getDirectoryDetails = filePath => {
  const dirs = fs.readdirSync(filePath);
  return {
    dirs: dirs.filter(name => isDirectory(path.join(filePath, name))),
    files: dirs.filter(name => isFile(path.join(filePath, name)))
  };
};

const getFilesRecursively = (parentPath, currentFolder) => {
  const currentFolderPath = path.join(parentPath, currentFolder);
  let currentDirectoryDetails = getDirectoryDetails(currentFolderPath);

  const final = {
    current_dir: currentFolder,
    dirs: currentDirectoryDetails.dirs.map(dir =>
      getFilesRecursively(currentFolderPath, dir)
    ),
    files: currentDirectoryDetails.files
  };

  return final;
};

const getAllFiles = relativePath => {
  const fullPath = path.join(__dirname, relativePath);
  const parentDirectoryPath = path.dirname(fullPath);
  const leafDirectory = path.basename(fullPath);

  const allFiles = getFilesRecursively(parentDirectoryPath, leafDirectory);
  return allFiles;
};

function readFileAsync(filePath, options = {}) {
  return new Promise((resolve) => {
      fs.readFile(filePath, options, (error, buffer) => {
          if (error)
              throw error;
          if (!buffer)
              throw new Error('Buffer could not be initialized!');
          // console.log("file data:", data);
          resolve(buffer);
      });
  });
}


module.exports = { getAllFiles, readFileAsync };