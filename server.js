const express = require('express');

const app = express();

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

app.use(express.static(__dirname));

app.get('/messages', (request, response) => {
	response.send(messages);
})

const server = app.listen(3000, () => {
	console.log(`Server listening on port ${server.address().port}`);
});

