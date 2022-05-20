const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require("dotenv").config();

const app = express(); // creating an instance of an express 'APP'

//configuration options
var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//hooked up pieces of my api
require('./app/index');
require('./app/routes/products.routes.js')(app);
require('./app/routes/users.routes.js')(app);


//listen/opening the server on port

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}!`);
});


