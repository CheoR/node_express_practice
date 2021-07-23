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
// const bodyParser = require('body-parser');

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
	response.sendStatus(200);
});

const server = app.listen(3000, () => {
	console.log(`Server listening on port ${server.address().port}`);
});
