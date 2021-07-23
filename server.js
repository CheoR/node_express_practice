require('dotenv').config();

const messages = [
	{
		name: "cow",
		message: "moo moo moo moo"
	},
	{
		name: "pig",
		message: "oink oink oink oink"
	}
];

const express = require('express');
const app = express();

// const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://user:${process.env.DB_PASSWORD}@learnmongodb.1j6ce.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const uri = `mongodb+srv://user:user@learnmongodb.1j6ce.mongodb.net/learnMongoDB?retryWrites=true&w=majority`;

/*
	to use socket.io
*/
const http = require('http').Server(app);
const io = require('socket.io')(http);

/*
	depreciated
	const bodyParser = require('body-parser');
*/

/*
Middleware for parsing application/json
body-parser deprecidated, use express instead
*/
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/messages', (request, response) => {
	response.send(messages);
});

app.post('/messages', (request, response) => {
	messages.push(request.body);
	io.emit('message', request.body);
	response.sendStatus(200);
});

io.on('connect', (socket) => {
	console.log('new user connected');
});

// mongoose.connect(uri, (error) => {
// 	console.log('mongodb connection', {useMongoClient: true}, error);
// });

client.connect((err) => {
	// const collection = client.db("test").collection("devices");
	// perform actions on the collection object
	console.log('monngo db connected', err);
	client.close();
});

const server = http.listen(3000, () => {
	console.log(`Server listening on port ${server.address().port}`);
});
