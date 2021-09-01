module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Article;
  };