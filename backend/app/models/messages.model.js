module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      linkedArticle: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      authorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      archived: {
        type: Sequelize.INTEGER,
        default: 0,
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
  
    return Message;
  };