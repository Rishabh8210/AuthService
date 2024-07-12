const { UserService } = require('../services/index');
const {ServerErrorCodes, SuccessCodes} = require('../utils/error-codes')
class UserController{
    constructor(){
        this.userController = new UserService();
    }
    createUser = async(req, res) => {
        try {
            const data = req.body;
            const user = await this.userController.createUser(data);
            return res.status(SuccessCodes.CREATED).json({
                data: user,
                success: true,
                message: 'Successfully create an user',
                err: {}
            })
        } catch (error) {
            console.log(error);
            return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'Not able to crete an user',
                err: error
            })
        }
    }
}

module.exports = UserController