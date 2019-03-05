class ConfigCommon {
    getConfig() {
        switch (process.env.MODE_BUILD) {
            case 'dev':
                return require('../../config/development')
            case 'prod':
                return require('../../config/production')
        }
        return require('../../config/development')
    }

    getGoogleCloud() {
        return this.getConfig().googleCloud
    }

    getDatabaseUrl() {
        return this.getConfig().databaseURL
    }

    getHost() {
        return this.getConfig().host
    }

    getHostWeb() {
        return this.getConfig().hostWeb;
    }

    getEmail() {
        return this.getConfig().email
    }

    getTwitter() {
        return this.getConfig().twitter
    }

    getLine() {
        return this.getConfig().line
    }

    getEncodeDecode() {
        return this.getConfig().encodeDecode;
    }

    getWhiteList() {
        return this.getConfig().whiteList;
    }

    getCurrencySymbol() {
        return this.getConfig().currencySymbol
    }

    getBitcoinConfig() {
        return this.getConfig().bitcoinConfig;
    }

    getEthereumConfig() {
        return this.getConfig().ethereumConfig
    }

    getLinkTransaction() {
        return this.getConfig().linkTransaction;
    }

    getTargetBonus() {
        return this.getConfig().targetBonus;
    }

    getTwitter() {
        return {}
    }
}
module.exports = new ConfigCommon();
