module.exports = (sequelize, Sequelize) => {
    const Media = sequelize.define("medias", {
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
  
    return Media;
  };