require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const uri = `mongodb+srv://user:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.1j6ce.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Message = mongoose.model('Message', {
	name: String,
	message: String
});

/*
Middleware for parsing application/json
body-parser deprecidated, use express instead
	depreciated
	const bodyParser = require('body-parser');
*/
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/messages', (req, res) => {
	/*
		{} - return all messages, else use to filter
	*/
		Message.find({}, (err, messages) => {
			res.send(messages);
		});
});

app.post('/messages', (req, res) => {
	const message = new Message(req.body);

	message.save()
		.then(() => {
			console.log('Message Saved');
			return Message.findOne({message: 'test'});
		})
		.then((resFound) => {
			console.log(`resFound: ${resFound}`);
			if(resFound) {
				/*
					_id : mongo manges. not part of schema
				*/
				console.log('test found in message', resFound);
				return Message.deleteOne({_id: resFound.id});
			}
			io.emit('message', req.body);
			res.sendStatus(200);
		})
			.catch((error) => {
				console.log('ERROR => ');
				res.sendState(500);
				return console.error(error);
			});
		});
				
		// client.connect((err) => {
		// 		const collection = client.db("test").collection("devices");
		// 		perform actions on the collection object
		// 		console.log('monngo db connected', err);
		// 		client.close();
		// 	});

	io.on('connect', (socket) => {
		console.log('new user connected');
	});
	
mongoose.connect(uri, {}, (err) => {
	console.log('mongo db connection', err)
})

const server = http.listen(3000, () => {
	console.log(`Server listening on port ${server.address().port}`);
});
