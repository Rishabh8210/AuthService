const { UserService } = require('../services/index');
const { StatusCodes } = require('http-status-codes')
class UserController{
    constructor(){
        this.userController = new UserService();
    }
    createUser = async(req, res) => {
        try {
            const data = req.body;
            const user = await this.userController.createUser(data);
            return res.status(StatusCodes.CREATED).json({
                data: user,
                success: true,
                message: 'Successfully create an user',
                err: {}
            })
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode).json({
                data: {},
                success: false,
                message: error.message,
                err: error.explanation
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
            return res.status(error.statusCode).json({
                data: {},
                success: false,
                message: error.message,
                err: error.explanation
            })
        }
    }
    isAuthenticated = async (req, res) => {
        try {
            const token = req.headers['x-access-token'];
            const response = await this.userController.isAuthenticated(token);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'token is valid',
                err: {}
            });
        } catch (error) {
            console.log(error);
            return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'token is invalid',
                err: error
            })
        }
    }
}

module.exports = UserController