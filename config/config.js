const convict = require('convict');

const config = convict(require('./schema'));

const env = config.get('env');
config.loadFile('config/env/' + env + '.json');

config.validate({allowed: 'strict'});

module.exports = config;