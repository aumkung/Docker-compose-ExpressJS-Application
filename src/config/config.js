'use strict';
require('dotenv').config();
module.exports = {
    development: {
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        operatorsAliases: 0,
        logging: true,
        define: {
            timestamps: true,
            underscored: true,
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        timezone: process.env.DB_TIMEZONE,
        dialectOptions: {
            timezone: process.env.DB_TIMEZONE,
        },
    }
};
