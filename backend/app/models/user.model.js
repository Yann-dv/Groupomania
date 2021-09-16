module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      gender: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATEONLY,
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        isEmail: true,
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      archived: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      archivedAt: {
        type: Sequelize.DATE,
      },
    });
  
    return User;
  };