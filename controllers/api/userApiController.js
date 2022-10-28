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
            let user = await db.User.findByPk(userId);
            const image = `${req.protocol}://${req.headers.host}/img/users/${user.avatar}`
            user = {
                id: user.id,
                name: user.name,
                email: user.email,
                phone : user.phone_number,
                avatar: image 
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
    }
}
module.exports = userApiController;
