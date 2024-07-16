const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: 'email or password missing in the signup request'
        })
    }
    next();
}
const isAuthenticated = (req, res, next) => {
    
}

module.exports = {
    validateUserAuth
}