const validateUserSigninAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: 'email or password missing in the signin request'
        })
    }
    next();
}
const validateUserSignupAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password || !req.body.name || !req.body.age || !req.body.gender || !req.body.phone){
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: 'required fields are missing in the signup request'
        })
    }
    next();
}
const isAuthenticated = (req, res, next) => {
    
}

module.exports = {
    validateUserSigninAuth,
    validateUserSignupAuth
}