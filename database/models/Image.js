module.exports = (sequelize,dataTypes) =>{

    let alias = 'Image';

    let cols = {
        
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        file_name: {type: dataTypes.TEXT},
        products_id: {type: dataTypes.INTEGER},
    };

    let config = {
        tableName: 'images',
        timestamps:false
    }

    const Image = sequelize.define(alias,cols,config);

    Image.associate = (models)=>{
        Image.belongsTo(models.Product,{
            as: 'Product',
            foreignKey: 'products_id'
        })
    };

    return Image;
}