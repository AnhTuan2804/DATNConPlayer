const Sequelize = require('sequelize');
const _ = require('lodash');
const config = require('../../config/db.config')

let sequelize = null;

class Db {
    constructor() {
        if (!sequelize) {
            let anc = config.dbLocal.options;
            anc['isolationLevel'] = Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            sequelize = new Sequelize(config.dbLocal.dbname, config.dbLocal.username, config.dbLocal.password, config.dbLocal.options);
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

    getOrder(object) {
        if (!object) {
            object = {};
        }
        object['order'] = [
            ['created_at', 'DESC']
        ]
        return object;
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
        this.user = sequelize.import('./models/user/user');
        this.role = sequelize.import('./models/user/role');
        this.user.belongsTo(this.role, { unique: false, onDelete: 'cascade' });

        //area
        this.area = sequelize.import('./models/area');

        //level
        this.level = sequelize.import('./models/level');

        //date Of The Week
        this.date_of_the_week = sequelize.import('./models/date_of_the_week');

        //price On Time
        this.price_on_time = sequelize.import('./models/price_on_time');

        //size gridiron
        this.size_gridiron = sequelize.import('./models/size_gridiron');

        //team
        this.team = sequelize.import('./models/team');

        //team User
        this.teamUser = sequelize.import('./models/team_user');

    }

    rawQuery(sql, whereClause) {
        return sequelize.query(sql, whereClause).then(result => {
            return result;
        })
    }
}

module.exports = new Db();