import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
      User.hasMany(models.Blog, {
        foreignKey: 'userId',
        as: 'blogs',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments',
        onDelete: 'CASCADE',
      });
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    },
  );

  return User;
};
