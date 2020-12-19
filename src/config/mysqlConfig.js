const mysql = require('mysql2');
const bluebird = require('bluebird');
const dotenv = require('dotenv')

dotenv.config({ path: '../../.env' })

const dbConf = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sap',
    Promise: bluebird
};

class Database {
    static async getDBConnection() {
        try {
            if (!this.db) {
                await mysql.createConnection(dbConf);
                const pool = mysql.createPool(dbConf);
                const promisePool = pool.promise();
                this.db = promisePool;
            }
            return this.db;
        } catch (err) {
            console.log('Error in database connection');
            console.log(err.errro || err);
        }

    }
}

module.exports = Database;