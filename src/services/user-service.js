const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config/serverConfig')
const { UserRepository } = require('../repository/index');
const bcrypt = require('bcrypt');
const sendVerificationMail = require('./mail-service');
const AppError = require('../utils/error-handler');
const ClientError = require('../utils/client-error');
const { StatusCodes } = require('http-status-codes')
class UserService{
    constructor(){
        this.userService = new UserRepository();
    }
    async createUser(data){
        try {
            const user = await this.userService.createUser(data);
            sendVerificationMail(data.email)
            return user;
        } catch (error) {
            console.log(error)
            if(error.name == 'SequelizeValidationError'){
                throw error
            }
            console.log("Something went wrong inside Service layer");
            throw new AppError(
                'ServerError',
                'Something went wrong in the service',
                'Logical issue found',
                500
            )
        }
    }

    async deleteUser(id){
        try {
            const user = await this.userService.deleteUser(id);
            return true;
        } catch (error) {
            console.log("Something went wrong inside Service layer");
            throw {error}
        }
    }

    async updateUser(data, id){
        try {
            const user = await this.userService.updateUser(data, id);
            return user;
        } catch (error) {
            console.log("Something went wrong inside Service layer");
            throw {error}
        }
    }

    async getUser(id){
        try {
            const user = await this.userService.getUser(id);
            return user;
        } catch (error) {
            console.log("Something went wrong inside Service layer");
            throw {error}
        }
    }
    
    async getUserByEmail(email){
        try {
            const user  =await this.userService.getUserByEmail(email);
            return user;
        } catch (error) {
            console.log("Something went wrong inside Service layer");
            throw error
        }
    }

    createToken(user){
        try {
            const response = jwt.sign(user, JWT_SECRET_KEY, {expiresIn: '1d'});
            return response;
        } catch (error) {
            console.log("Something went wrong while creating token", error);
            throw {error}
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_SECRET_KEY)
            return response;
        } catch (error) {
            console.log("Something went wrong while verifying the token", error);
            throw {error}
        }
    }

    checkPassword(userPassword, encryptedPassword){
        try {
            const response = bcrypt.compareSync(userPassword, encryptedPassword);
            return response;
        } catch (error) {
            console.log("Something went wrong while verifying password");
            throw {error}
        }
    }

    async signIn(email, password){ // user = {email: 'xyz@abc.com', password: 'abc123@'}
        try {
            const isUserExist = await this.userService.getUserByEmail(email);
            const validatePassword = this.checkPassword(password, isUserExist.password);
            if(!validatePassword){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid password send in the request',
                    'Please check the password, as there is no record of the email',
                    StatusCodes.NOT_FOUND
                )
            }
            const token = this.createToken({email, id: isUserExist.id});
            return token;
        } catch (error) {
            if(error.name = 'AttributeNotFound'){
                throw error
            }
            console.log("Something went wrong inside the signin method");
            throw error
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid Token'}
            }
            const user = await this.userService.getUser(response.id);
            if(!user){
                throw {error: 'No user with corresponding token exists'}
            }
            return user.id;
        } catch (error) {
            console.log('Something went wrong inside the authentication method')
            throw {error}
        }
    }
}

module.exports = UserService