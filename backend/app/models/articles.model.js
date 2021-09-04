module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      authorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
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