const fs = require('fs');
const path = require('path');

const invalidFilePattern = /^[\.]{1,2}$/;
const jsFilePattern = /^.*\.js$/;

function isValidFileName(fileName) {
    return !invalidFilePattern.test(fileName);
}

function isFileADirectory(filePath) {
    return fs.lstatSync(filePath).isDirectory();
}

function isAJsFile(filePath) {
    return jsFilePattern.test(filePath);
}

function getValidFileNames(baseDir) {
    const fileNames = fs
        .readdirSync(baseDir)
        .filter(isValidFileName);

    return fileNames;
}

function getValidPaths(filePath) {
    if (isFileADirectory(filePath)) {
        return loadFilePaths(filePath);
    } else if (isAJsFile(filePath)) {
        return [filePath];
    }

    return [];
}

function buildFilePath(baseDir) {
    return function (fileName) {
        return path.join(baseDir, fileName);
    }
}

function aggregatePaths(paths, filePath) {
    return paths.concat(getValidPaths(filePath));
}

function getValidFilePaths(baseDir) {
    return getValidFileNames(baseDir)
        .map(buildFilePath(baseDir))
        .reduce(aggregatePaths, []);

}

function loadFilePaths(baseDir) {
    return getValidFilePaths(baseDir);
}

module.exports = {
    loadFilePaths: loadFilePaths
}