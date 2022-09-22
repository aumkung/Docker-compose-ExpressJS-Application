const {
    User
  } = require('../models')
const Redis = require('ioredis');
const client = new Redis({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
});
const path = require('path');
const moment = require('moment')
const { optimize } = require('../utils/imageHelper');
  

class UserResourceController {

    index = (req, res) => {
        return res.status(200).json({
            data: 'api users test'
        })
    }

    list = async (req, res) => {
        const minutes = 1
        const expired = minutes * 60
        const key = 'users:datas:01'
        try {
            let result = await client.get(key);
            if (!result) {
                const users = await User.findAll()
                await client.expire(key, expired);
                result = {
                    users,
                    from_redis: false
                }
            } else {
                result = {
                    users: JSON.parse(result),
                    from_redis: true
                }
            }
            return res.status(200).json({ data: result })
        } catch (e) {
            return res.status(500).json({
                data: e.message
            })
        }
    }

    upload = async (req, res) => {
        try {
			const { pathFromTmp, pathToSave, masterPath, ext, master_name } = this.getFilename(req.file, 'media')
			await optimize(82, pathFromTmp, pathToSave, masterPath, ext)
			const url = `${process.env.HOST}/${pathToSave}`
			return res.status(200).json({
				pathFromTmp, pathToSave, masterPath, ext, master_name, url
			})
        } catch (e) {
            return res.status(500).json({
                data: e.message
            })
        }
    }

	getFilename = (file, prefix) => {
		let original_name = file.filename
		let tmp = 'public/tmp'
		let pathFromTmp = `${tmp}/${original_name}`
		let ext = path.extname(pathFromTmp).split('.')[1]
		let destinationPath = `${prefix}/images/${moment().format('YYYY/MM/DD')}`
		let masterPath = `public/uploads/${destinationPath}`
		let master_name = `${prefix}-${this.randStr(8)}.${ext}`
		let pathToSave = `public/uploads/${destinationPath}/${master_name}`
		return { pathFromTmp, pathToSave, masterPath, ext, master_name }
	}

	randStr = () => {
		return Math.random().toString(36).substr(2, 10);
	}
}

module.exports = new UserResourceController()