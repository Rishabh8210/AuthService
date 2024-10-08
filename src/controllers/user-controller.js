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
            // console.log(email, password)
            const user = await this.userController.getUserByEmail(email);
            const token = await this.userController.signIn(email, password);
            return res.status(StatusCodes.OK).json({
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
    getUserById = async(req, res) => {
        try {
            const { id } = req.params;
            console.log(id)
            const user = await this.userController.getUser(id);
            return res.status(StatusCodes.OK).json({
                data: user,
                success: true,
                message: 'Successfully signed in',
                err: {},
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
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
            console.log(token)
            const response = await this.userController.isAuthenticated(token);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'token is valid',
                err: {}
            });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                success: false,
                message: 'token is invalid',
                err: error
            })
        }
    }
}

module.exports = UserController