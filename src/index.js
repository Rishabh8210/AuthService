const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const ApiRoutes = require('./routes/index')

function createAndStartServer(){
    const app = express()
    const router = express.Router();
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', ApiRoutes);

    app.listen(PORT, async() => {
        console.log(`Server is running at PORT ${PORT}`)
    })
}
createAndStartServer()