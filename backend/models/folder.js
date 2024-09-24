module.exports = (sequelize, DataTypes) => {
    const Folder = sequelize.define('Folder', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: { // Foreign key to associate with User
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Name of the User table
          key: 'id'
        }
      }
    }, {
      tableName: 'Folders' // Specify the table name if different
    });
  
    return Folder;
  };