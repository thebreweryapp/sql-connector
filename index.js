const Sequelize = require('sequelize');
const { connectorFactory } = require('@amberjs/core');
const configValidator = require('./configValidator');

/**
 *
 * @param {Object} config Connector config object
 */
const initialize = config => {
  /** validate config input */
  const { isValid, errors } = configValidator(config);
  if (!isValid) {
    console.log(errors);
    throw new Error('Invalid config');
  }

  this.sequelize = new Sequelize(config);
  this.sequelize.DataTypes = Sequelize.DataTypes;
  this.sequelize.isSync = config.isSync;
  this.sequelize.alter = config.alter;
  /** create sequelize instance */
  return this.sequelize;
};

/**
 * Connect to service
 */
const connect = () => {
  return this.sequelize.authenticate();
};

/**
 * Disconnect from service
 */
const disconnect = () => {
  return this.sequelize.close();
};

const SqlConnector = connectorFactory('sql', initialize, connect, disconnect);

module.exports = SqlConnector;
