const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const File = sequelize.define('File', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      }
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        isInt: true,
      }
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {},
      allowNull: true
    },
    folderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Folders',
        key: 'id'
      }
    },
    isLatest: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'Files',
    timestamps: true,
    paranoid: true,
    underscored: true,
  });

  File.associate = (models) => {
    File.belongsTo(models.Folder, {
      foreignKey: 'folderId',
      onDelete: 'CASCADE'
    });
  };

  return File;
};
