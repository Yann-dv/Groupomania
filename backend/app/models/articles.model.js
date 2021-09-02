module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      author: {
        type: Sequelize.INTEGER,
        allowNull: false,
        /*references: {
          model: 'Users',
          key: 'id'
        }*/
      },
      content: {
        type: Sequelize.TEXT,
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
  
    return Article;
  };