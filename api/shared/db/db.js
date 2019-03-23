const Sequelize = require('sequelize');
const config = require('config')
const _ = require('lodash');
const configCommon = require('../configCommon')

let sequelize = null;

class Db {
    constructor() {
        if (!sequelize) {
            let anc = configCommon.getDb().options;
            anc['isolationLevel'] = Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            sequelize = new Sequelize(configCommon.getDb().dbname, configCommon.getDb().username, configCommon.getDb().password, configCommon.getDb().options);
        }
    }

    getSequelize() {
        return sequelize;
    }

    getTransaction(transaction, whereClause) {
        if (!whereClause) {
            whereClause = {}
        }
        if (transaction) {
            whereClause['transaction'] = transaction;
        }
        return whereClause;
    }

    connect() {
        console.log('connect start');
        let connectPromise = sequelize.authenticate()
            .then(() => {
                console.log('sequelize authenticated');
                return sequelize.sync({ force: config.recreateDB })
                    .then(() => {
                        console.log('sequelize synced');
                        return sequelize;
                    })
            }).catch((error) => {
                throw error;
            })
        this.initModels();
        return connectPromise;
    }

    //merge the properties from models into this Db object
    initModels() {
        //user
        console.log('test thu ok')
        
    }

    rawQuery(sql, whereClause) {
        return sequelize.query(sql, whereClause).then(result => {
            return result;
        })
    }
}

module.exports = new Db();