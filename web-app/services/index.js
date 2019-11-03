const sampleService = require('./sample.service');
const awsService = require('./aws.service');
const { user: userService } = require('./db.service');

module.exports = {
  sampleService,
  awsService,
  userService
};
