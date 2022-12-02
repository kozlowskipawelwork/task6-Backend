var Express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

const dbService = require("./services/db-service");
const mysqlUsers = require("./services/users");
const mysqlMessages = require("./services/messages");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(49146, () => {
    console.log('API starting...');
    dbService._mySqlService.getConnection( (error) => {
        if (error) throw error;
        console.log('Connected to MySQL');
    })
    console.log('API ready and waiting...');
});


// GET -- Hello World from root
app.get('/', (request, response) => { HelloWorldResponse(response); });

function HelloWorldResponse(response) {
    console.log(`API# ${++global.apiCounter} [/] requested`);
    response.send('Hello World!');
};

/* ***************** USERS ************* */
// GET get all rows from Employee
app.get('/api/users', (request, response) => { mysqlUsers.UsersGetAll(request, response); });

// POST add new user
app.post('/api/user', (request, response) => { mysqlUsers.UsersAddOne(request, response); });

// PUT update user name
app.put('/api/user', (request, response) => { mysqlUsers.UsersUpdateOne(request, response); });

// DELETE remove user from database
app.delete('/api/user/:id', (request, response) => { mysqlUsers.UsersDeleteOne(request, response); });

// AUTENTICATION -> user/autentication
app.post('/api/user/authentication', (request, response) => { mysqlUsers.UserAuthentication(request, response); });

// PUT block user
app.put('/api/user/block', (request, response) => { mysqlUsers.UsersBlockOne(request, response); });

// PUT un-block all users
app.put('/api/user/unblock', (request, response) => { mysqlUsers.UsersUnBlockAll(request, response); });


/* ***************** MESSAGES ************* */
// GET get all rows from Messages
app.get('/api/messages', (request, response) => { mysqlMessages.MessagesGetAll(request, response); });

// POST add new message
app.post('/api/messages', (request, response) => { mysqlMessages.MessagesAddOne(request, response); });

// POST add new message
app.post('/api/messages/recipient', (request, response) => { mysqlMessages.MessagesGetRecipientAll(request, response); });


// END of API definition