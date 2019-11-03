const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

const basename = path.basename(__filename);
const db = {};
const {
  RDS_DB_NAME: dbName,
  RDS_HOSTNAME: host,
  RDS_PORT: port,
  RDS_USERNAME: user,
  RDS_DB_PASSWORD: password
} = process.env;

mysql
  .createConnection({
    host,
    port,
    user,
    password
  })
  .then(connection => {
    // eslint-disable-next-line no-unused-vars
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then(res => {
      // eslint-disable-next-line no-console
      console.info('Database create or successfully checked');
      connection.end();
    });
  });

const sequelize = new Sequelize(dbName, user, password, {
  host,
  dialect: 'mysql',
  timestamps: false
});

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log('Unable to connect to the database:', err);
  });

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
