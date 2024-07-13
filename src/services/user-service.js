const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config/serverConfig')
const { UserRepository } = require('../repository/index');
class UserService{
    constructor(){
        this.userService = new UserRepository();
    }
    async createUser(data){
        try {
            const user = await this.userService.createUser(data);
            return user;
        } catch (error) {
            console.log("Something went wrong inside Service layer");
            throw {error}
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
            throw {error}
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
}

module.exports = UserService