const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Folder = sequelize.define('Folder', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    tableName: 'Folders',
    timestamps: true,
    paranoid: true,
    underscored: true,
  });

  Folder.associate = (models) => {
    Folder.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Folder.hasMany(models.File, {
      foreignKey: 'folderId',
      onDelete: 'CASCADE'
    });
  };

  return Folder;
};
