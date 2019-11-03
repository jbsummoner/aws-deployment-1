module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(200)
        // unique: true
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      filename: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      s3rawurl: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      s3finishedurl: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      issubscribed: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
