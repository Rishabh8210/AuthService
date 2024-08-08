const nodemailer = require('nodemailer');
const {user, pass} = process.env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass,
    }
})

const sendVerificationMail = async (mail) => {
    const mailOptions = {
        from: user,
        to: mail,
        subject: 'Verify your email',
        html: `<h1>Verify your gmail</h1><a href="http://localhost:3000/verify">Verify here</a>`
    }

    transporter.sendMail(mailOptions, (err, indo) => {
        if(err){
            console.log(err)
        }else{
            console.log(indo)
        }
    })
}

module.exports = sendVerificationMail