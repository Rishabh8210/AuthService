const { UserService } = require('../services/index');
const {ServerErrorCodes, SuccessCodes, ClientErrorsCodes} = require('../utils/error-codes')
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
    signin = async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await this.userController.getUserByEmail(email);
            const token = await this.userController.signIn(email, password);
            return res.status(SuccessCodes.OK).json({
                data: user,
                success: true,
                message: 'Successfully signed in',
                err: {},
                token: token
            })
        } catch (error) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                success: false,
                message: 'User credential not match, signin fail',
                err: error
            })
        }
    }
}

module.exports = UserController