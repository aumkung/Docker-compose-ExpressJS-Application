const sharp = require('sharp');
const mkdirp = require('mkdirp')
const fsExtra = require('fs-extra')

module.exports = {
    crop: async (width = 1200, height = 627, quality = 82, pathFromTmp, pathToSave, masterPath, position, ext) => {
        if (position === '' || position === null) {
            position = 'centre'
        }
        mkdirp.sync(masterPath)
        if (ext === 'png') {
            await sharp(pathFromTmp)
            .resize(width, height, {
                fit: 'cover',
                position: position
              }).png({quality: quality}).toFormat("png").toFile(pathToSave)
        } else if (ext === 'jpg' || ext === 'jpeg') {
            await sharp(pathFromTmp)
            .resize(width, height, {
                fit: 'cover',
                position: position
              }).jpeg({quality: quality}).toFormat("jpg").toFile(pathToSave)
        }
        return true
    },

    optimize: async (quality = 82, pathFromTmp, pathToSave, masterPath, ext) => {
        mkdirp.sync(masterPath)
        if (ext === 'png') {
            await sharp(pathFromTmp, { failOnError: false }).rotate().png({
                quality: quality
            }).toFormat("png").toFile(pathToSave)
        } else if (ext === 'jpg' || ext === 'jpeg') {
            await sharp(pathFromTmp, { failOnError: false }).rotate().jpeg({
                quality: quality
            }).toFormat("jpg").toFile(pathToSave)
        }
        await fsExtra.remove(pathFromTmp)
        return true
    }
}