const express = require('express');
const bodyParser = require('body-parser');
const { PORT, DB_SYNC } = require('./config/serverConfig');
const ApiRoutes = require('./routes/index')

const db = require('./models/index')

function createAndStartServer(){
    const app = express()
    const router = express.Router();
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', ApiRoutes);
    app.get('/verify', async (req, res) => {
        // we can update user verify attribute from here 
        res.status(200).json("Verification successfully, you're shortly redirected to home page")
    })
    app.listen(PORT, async() => {
        if(DB_SYNC){
            db.sequelize.sync({alter: true})
        }
        console.log(`Server is running at PORT ${PORT}`)
    })
}
createAndStartServer()