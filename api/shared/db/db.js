const Sequelize = require('sequelize');
const _ = require('lodash');
const config = require('../../config/db.config')

let sequelize = null;

class Db {
    constructor() {
        if (!sequelize) {
            let anc = config.dbLocalMobile.options;
            anc['isolationLevel'] = Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            sequelize = new Sequelize(config.dbLocalMobile.dbname, config.dbLocalMobile.username, config.dbLocalMobile.password, config.dbLocalMobile.options);
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
        this.team.belongsTo(this.level, { unique: false, onDelete: 'cascade' });
        this.team.belongsTo(this.area, { unique: false, onDelete: 'cascade' });
        this.area.hasMany(this.team, { onDelete: 'cascade' });
        this.level.hasMany(this.team, { onDelete: 'cascade' });

        //team User
        this.teamUser = sequelize.import('./models/team_user');
        this.teamUser.belongsTo(this.user, { unique: false, onDelete: 'cascade' });
        this.teamUser.belongsTo(this.team, { unique: false, onDelete: 'cascade' });
        this.team.hasMany(this.teamUser, { onDelete: 'cascade' });
        this.user.hasMany(this.teamUser, { onDelete: 'cascade' });

        //gridiron
        this.gridiron = sequelize.import('./models/gridiron');
        this.gridiron.belongsTo(this.area, { unique: false, onDelete: 'cascade' });

        //gridiron
        this.sub_gridiron = sequelize.import('./models/sub_gridiron');
        this.sub_gridiron.belongsTo(this.gridiron, { unique: false, onDelete: 'cascade' });
        this.sub_gridiron.belongsTo(this.size_gridiron, { unique: false, onDelete: 'cascade' });
        this.gridiron.hasMany(this.sub_gridiron, { onDelete: 'cascade' });
        this.gridiron.hasMany(this.price_on_time, { onDelete: 'cascade' });

        //time
        this.time = sequelize.import('./models/time');
        this.price_on_time.belongsTo(this.gridiron, { unique: false, onDelete: 'cascade' });
        this.price_on_time.belongsTo(this.time, { unique: false, onDelete: 'cascade' });
        this.price_on_time.belongsTo(this.size_gridiron, { unique: false, onDelete: 'cascade' });

        //career
        this.career = sequelize.import('./models/career');
        this.team.belongsTo(this.career, { unique: false, onDelete: 'cascade' })
    }

    rawQuery(sql, whereClause) {
        return sequelize.query(sql, whereClause).then(result => {
            return result;
        })
    }
}

module.exports = new Db();