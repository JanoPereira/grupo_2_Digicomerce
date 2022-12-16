module.exports = (sequelize, dataTypes) => {
    let alias = "Order";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        users_id: { type: dataTypes.INTEGER },
        payment_methods_id: { type: dataTypes.INTEGER },
        name: {type: dataTypes.STRING(255)},
        last_name: {type: dataTypes.STRING(255)},
        phone: {type: dataTypes.STRING(45)},
        address: {type: dataTypes.STRING(255)},
        city: {type: dataTypes.STRING(255)},
        zip_code: {type: dataTypes.STRING(10)},
        total: {type: dataTypes.DECIMAL(10, 2)}
    }

    let config = {
        tableName: 'orders',
        paranoid: true
    }

    const Order = sequelize.define(alias, cols, config);

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'users_id'
        });
        Order.belongsTo(models.PaymentMethod, {
            as: 'paymentMethod',
            foreignKey: 'payment_methods_id'
        });
        Order.hasMany(models.OrderItem,{
            as:'orderItems',
            foreignKey:'orders_id'
        })
    };

    return Order;
}