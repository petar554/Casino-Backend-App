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
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
            const value = this.getDataValue('players');
            return value ? JSON.parse(value) : [];
        },
        set(value) {
            this.setDataValue('players', JSON.stringify(value));
        }
    }
}, {
    sequelize,
    modelName: 'Game'
});

module.exports = Game;
