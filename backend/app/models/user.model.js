module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      gender: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATEONLY,
        validate: {
          not: ["[a-z]",'i'],       // will not allow letters
        }
      },
      firstname: {
        type: Sequelize.STRING,
        validate: {
          is: ["^[a-z]+$",'i'],     // will only allow letters
        }
      },
      lastname: {
        type: Sequelize.STRING,
        validate: {
          is: ["^[a-z]+$",'i'],     // will only allow letters
        }
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
    });
  
    return User;
  };