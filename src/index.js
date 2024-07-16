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

    app.listen(PORT, async() => {
        if(DB_SYNC){
            db.sequelize.sync({alter: true})
        }
        console.log(`Server is running at PORT ${PORT}`)
    })
}
createAndStartServer()