module.exports=(sequelize,dataTypes)=>{
    
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {type: dataTypes.STRING(128)},
        email: {type: dataTypes.STRING(255)},
        password: {type: dataTypes.TEXT},
        phone_number: {type: dataTypes.STRING(45)},
        users_categories_id: {type: dataTypes.INTEGER},
        avatar: {type: dataTypes.TEXT}
    }

    let config = {
        tableName:'users',
        paranoid:true
    }

    const User = sequelize.define(alias,cols,config);

    User.associate = (models)=>{
        User.belongsTo(models.UserCategory,{
            as:'userCategory',
            foreignKey: 'users_categories_id'
        });
        User.hasMany(models.Order,{
            as:'orders',
            foreignKey:'users_id'
        });
        User.hasOne(models.TemporalCart,{
            as:'temporalCart',
            foreignKey:'userId'
        });
    };

    return User;
}