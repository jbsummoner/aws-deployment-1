const { User } = require('../models');

const userCreate = user => {
  return User.create(user)
    .then(result => result.dataValues)
    .catch(error => {
      if (error) throw error;
    });
};

const getAllUsers = () => {
  return User.findAll({
    // where: {
    //   email: 'test@gmail.com'
    // }
  })
    .then(users => users)
    .catch(error => {
      if (error) throw error;
    });
};

const getAllFilenames = () => {
  return User.findAll({
    // where: {
    //   email: 'test@gmail.com'
    // }
    attributes: ['filename']
  })
    .then(users => users)
    .catch(error => {
      if (error) throw error;
    });
};

const clearAllUsers = () => {
  return User.destroy({
    // where: {
    //    id: [1,2,3,4]
    //   }
    truncate: true
  })
    .then(users => users.dataValues)
    .catch(error => {
      if (error) throw error;
    });
};

module.exports = {
  user: {
    create: userCreate,
    getAll: getAllUsers,
    clear: clearAllUsers,
    getAllFilenames
  }
};
