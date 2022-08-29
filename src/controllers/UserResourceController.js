const {
    User
  } = require('../models')
const Redis = require('ioredis');
const client = new Redis({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
});
  

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
                await client.set(key, JSON.stringify(users))
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
}

module.exports = new UserResourceController()