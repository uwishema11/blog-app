import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        // Use singular 'User'
        foreignKey: 'userId',
        as: 'user', // Use singular 'user'
        onDelete: 'CASCADE',
      });
      Comment.belongsTo(models.Blog, {
        foreignKey: 'blogId',
        onDelete: 'CASCADE',
      });
    }
  }

  Comment.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // Use the model name as a string
          key: 'id',
        },
        allowNull: false,
      },
      blogId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Blogs', // Use the model name as a string
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      timestamps: true,
    },
  );

  return Comment;
};
