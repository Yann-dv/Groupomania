module.exports = (sequelize, Sequelize) => {
    const Media = sequelize.define("medias", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      author: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
      },
      archived: {
        type: Sequelize.INTEGER,
      },
      likes: {
        type: Sequelize.INTEGER,
      }
    });
  
    return Media;
  };