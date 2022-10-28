module.exports=(sequelize,dataTypes)=>{
    let alias = "ProductCategory";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {type: dataTypes.STRING(255)}
    }

    let config = {
        tableName:'products_categories',
        timestamps:false
    }

    const ProductCategory = sequelize.define(alias,cols,config);

    ProductCategory.associate = (models)=>{
        ProductCategory.hasMany(models.Product,{
            as:'products',
            foreignKey: 'products_categories_id'
        })
    };

    return ProductCategory;
}