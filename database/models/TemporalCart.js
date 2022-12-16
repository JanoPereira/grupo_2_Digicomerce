module.exports = (sequelize, dataTypes) => {
    let alias = "TemporalCart";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: { type: dataTypes.INTEGER }
    }

    let config = {
        tableName: 'temporal_carts',
        timestamps: false
    }

    const TemporalCart = sequelize.define(alias, cols, config);

    TemporalCart.associate = (models) => {
        TemporalCart.belongsTo(models.User, {
            as: 'user'
        });
        TemporalCart.hasMany(models.TemporalItem, {
            as: 'temporalItems',
            foreignKey: 'temporal_carts_id'
        });
    };

    return TemporalCart;
}