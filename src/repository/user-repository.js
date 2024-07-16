const { User, Role } = require('../models/index');

class UserRepository{
    async createUser(data){
        try{
            const user = await User.create(data);
            return user;
        }catch(error){
            console.log("Something went wrong inside Repository layer");
            throw {error}
        }
    }
    async deleteUser(id){
        try {
            const user = await User.destroy({
                where:{
                    id: id
                }
            })
            return true;
        } catch (error) {
            console.log("Something went wrong inside Repository layer");
            throw {error}
        }
    }
    async updateUser(data, id){
        try {
            const user = await User.findByPk(id);
            Object.assign(user, data);
            await user.save();
            return user;
        } catch (error) {
            console.log("Something went wrong inside Repository layer");
            throw {error}
        }
    }
    async getUser(id){
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            console.log("Something went wrong inside Repository layer");
            throw {error}
        }
    }
    async getUserByEmail(email){
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            return user
        } catch (error) {
            console.log("Something went wrong inside Repository layer");
            throw {error}
        }
    }
    async getMultiplUsers(){
        
    }
    async createMultipleUsers(){

    }

    async isAdmin(userId){
        try{
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            })
            return user.hasRole(adminRole);
        }catch(error){
            console.log("Something went wrong inside Repository layer");
            throw {error}
        }
    }
}

module.exports = UserRepository