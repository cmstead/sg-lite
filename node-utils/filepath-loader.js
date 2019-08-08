const fs = require('fs');
const path = require('path');

const validFilePattern = /(^[^\.]+$)/;
const jsFilePattern = /^.*\.js$/;

function isValidFileName(fileName) {
    return validFilePattern.test(fileName);
}

function isFileADirectory(filePath) {
    return fs.lstatSync(filePath).isDirectory();
}

function isAJsFile(filePath) {
    return jsFilePattern.test(filePath);
}

function getValidFileNames(baseDir) {
    return fs
        .readdirSync(baseDir)
        .filter(isValidFileName);
}

function getValidPaths(filePath) {
    if (isFileADirectory(filePath)) {
        return loadFilePaths(filePath);
    } else if (isAJsFile(filePath)) {
        return [filePath];
    }

    return [];
}

function buildFilePath(fileName) {
    return path.join(baseDir, fileName);
}

function aggregatePaths(paths, filePath) {
    return paths.concat(getValidPaths(filePath));
}

function getValidFilePaths(baseDir) {
    return getValidFileNames(baseDir)
        .map(buildFilePath)
        .reduce(aggregatePaths, []);

}

function loadFilePaths(baseDir) {
    return getValidFilePaths(baseDir, fileNames);
}

module.exports = {
    loadFilePaths: loadFilePaths
}