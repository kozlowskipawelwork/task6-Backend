const dbService = require("./db-service");
const mysql = require("mysql");

// GET all messages as rows
function MessagesGetAll(request, response) {
    console.log(`API# ${++dbService.apiCounter} GET::[/api/messages] requested`);

    dbService._mySqlService.getConnection(async (errorConnectToDatabase, connection) => {
        if (errorConnectToDatabase) {
            console.log(`DB Connection error# ${errorConnectToDatabase}`);
            throw errorConnectToDatabase;
        }

        // entry point to buisness logic
        const sqlQuery = `select * from PakoTest.Messages order by SendTime desc`;
        connection.query(sqlQuery, (error, rows) => {
            connection.release();
            if (error) {
                console.log(`Error occurs: ${error}`);
                return response.status(404).send({ text: 'Error occurs', error: error });
            }
            response.status(200).send(rows);
        });
    });
}

function MessagesAddOne(request, response) {
    console.log(`API# ${++dbService.apiCounter} POST::[/api/messages] requested`);

    dbService._mySqlService.getConnection(async (errorConnectToDatabase, connection) => {
        if (errorConnectToDatabase) {
            console.log(`DB Connection error# ${errorConnectToDatabase}`);
            throw errorConnectToDatabase;
        }

        // entry point to buisness logic
        const sqlInsert = `insert into PakoTest.Messages(MsgSender, MsgRecipient, MsgTitle, MsgBody) values (?,?,?,?)`;
        const msgSender = request.body['MsgSender'];
        const msgRecipient = request.body['MsgRecipient'];
        const msgTitle = request.body['MsgTitle'];
        const msgBody = request.body['MsgBody'];
        connection.query(mysql.format(sqlInsert, [msgSender, msgRecipient, msgTitle, msgBody]), async (insertError) => {
            connection.release();
            if (insertError) {
                console.log(`Error occurs: ${insertError}`);
                return response.status(404).send({ text: 'Error occurs', error: insertError });
            }
            response.status(200).send({ text: `Message from ${msgSender} to ${msgRecipient} with subject ${msgTitle} added!`});
        });
    });
};

function MessagesGetRecipientAll(request, response) {
    console.log(`API# ${++dbService.apiCounter} POST::[/api/messages/recipient] requested`);

    dbService._mySqlService.getConnection(async (errorConnectToDatabase, connection) => {
        if (errorConnectToDatabase) {
            console.log(`DB Connection error# ${errorConnectToDatabase}`);
            throw errorConnectToDatabase;
        }

        // entry point to buisness logic
        const sqlQuery = `select * from PakoTest.Messages where MsgRecipient = ? order by SendTime desc`;
        const msgRecipient = request.body['MsgRecipient'];
        connection.query(mysql.format(sqlQuery, [msgRecipient]), (error, rows) => {
            connection.release();
            if (error) {
                console.log(`Error occurs: ${error}`);
                return response.status(404).send({ text: 'Error occurs', error: error });
            }
            response.status(200).send(rows);
        });
    });
}

module.exports = {
    MessagesGetAll, MessagesAddOne, MessagesGetRecipientAll
};