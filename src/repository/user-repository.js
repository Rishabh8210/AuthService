const { User } = require('../models/index');

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
    async getUser(){
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            console.log("Something went wrong inside Repository layer");
            throw {error}
        }
    }
    async getMultiplUsers(){
        
    }
    async createMultipleUsers(){

    }
}

module.exports = UserRepository