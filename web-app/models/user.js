module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(200),
        validate: {
          isEmail: true
        }
        // unique: {
        //   args: 'email',
        //   msg: 'The email is already taken!'
        // }
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(20)
      },
      filename: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      s3rawurl: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      s3finishedurl: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      status: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      issubscribed: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {}
  );

  // eslint-disable-next-line no-unused-vars
  User.associate = models => {
    // associations can be defined here
  };
  User.sync({ force: false });

  return User;
};
