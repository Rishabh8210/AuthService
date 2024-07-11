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
}

module.exports = UserService