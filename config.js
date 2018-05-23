'use strict';
exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongo ds133816.mlab.com:33816/tech-up-capstone -u doty -p 12345';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'dominic';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '5d';
