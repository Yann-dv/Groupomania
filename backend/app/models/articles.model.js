module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        defaultValue: "#",
      },
      archived: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      archivedAt: {
        type: Sequelize.DATE,
      },
      likes: {
        type: Sequelize.INTEGER,
        default: 0,
      },
      dislikes:  {
        type: Sequelize.INTEGER,
        default: 0,
      },
      createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      },
      updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      },
    });
  
    return Article;
  };