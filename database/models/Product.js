module.exports = (sequelize, dataTypes) => {
    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: dataTypes.STRING(128) },
        price: { type: dataTypes.DECIMAL(10, 2) },
        discount: { type: dataTypes.TINYINT },
        description: { type: dataTypes.TEXT },
        featured: { type: dataTypes.TINYINT(1)},
        products_categories_id: { type: dataTypes.INTEGER }
    }

    let config = {
        tableName: 'products',
        paranoid: true
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.ProductCategory, {
            as: 'productCategory',
            foreignKey: 'products_categories_id'
        });
        Product.hasMany(models.Image,{
            as:'images',
            foreignKey:'products_id'
        });
        Product.hasMany(models.OrderItem,{
            as:'orderItems',
            foreignKey:'products_id'
        });
    };

    return Product;
}