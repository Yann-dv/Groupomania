module.exports = (sequelize, Sequelize) => {
    const Medias = sequelize.define("Medias", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contain: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
      },
      archived: {
        type: Sequelize.INTEGER,
      },
    });
  
    return Medias;
  };