const db = require('../../database/models');

const userApiController = {
    list: async (req, res) => {
        try {
            let users = await db.User.findAll(); //[{id,name,password,email,categories,avatar,}]
            users = users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    url: `/api/user/${user.id}`
                }
            });

            return res.status(200).json({
                meta: {
                    status: 200,
                    total: users.length,
                    url: 'api/user'
                },
                count: users.length,
                users
            });
        } catch (error) {
            console.log('El error fue en userApiController.list: ' + error);
            return res.json(error);
        }
    },
    detail: async (req, res) => {
        try {
            const userId = req.params.id;
            let user = await db.User.findByPk(userId, {
                include: [
                    'orders',
                    'userCategory',
                    {
                        association: 'temporalCart',
                        include: [
                            {
                                association: 'temporalItems',
                                include: [
                                    {
                                        association: 'product',
                                        include: [
                                            'images'
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            const image = `${req.protocol}://${req.headers.host}/img/users/${user.avatar}`
            const { id, name, email, phone, avatar, temporalCart, orders, userCategory } = user
            user = {
                id,
                name,
                email,
                phone,
                avatar,
                temporalCart,
                orders,
                userCategory
            }
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: user.length,
                    url: 'api/user'
                },
                user
            })
        } catch (error) {
            console.log('El error fue en userApiController.detail: ' + error);
            return res.json(error);

        }
    },
    createTempCart: async (req, res) => {
        try {
            const userId = req.params.id;
            // return res.json({body:req.body})
            const { id, quantity } = req.body;
            const tempCart = await db.TemporalCart.create({
                userId
            });
            await db.TemporalItem.create({
                temporal_carts_id: tempCart.id,
                products_id: id,
                quantity
            })

            return res.json({
                ok: true,
                meta: {
                    status: 200,
                    url: `api/user/${userId}/createTempCart`
                },
                tempCart
            });

        } catch (error) {
            console.log('El error fue en userApiController.createTempCart: ' + error);
            return res.json(error);
        }
    }
}
module.exports = userApiController;
