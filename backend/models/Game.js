const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/database');

class Game extends Model {}

Game.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    players: {
        type: DataTypes.ARRAY(DataTypes.JSONB), 
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Game'
});

module.exports = Game;
