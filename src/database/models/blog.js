import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Blog extends Model {
    static associate(models) {
      // Define associations here
      Blog.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
      Blog.hasMany(models.Comment, {
        foreignKey: 'blogId',
        as: 'comments',
        onDelete: 'CASCADE',
      });
    }
  }

  Blog.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // Use the model name as a string
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Blog',
      timestamps: true,
    },
  );

  return Blog;
};
