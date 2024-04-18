const express = require('express')
const db = require('./db')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const port = 8080

app.get('/users', async (req, res) => {

	const { userName, password } = req.query;
	
	try {
		const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
		const values = [userName, password];
		const result = await db.query(query, values);
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
});

app.post('/users', async (req, res) => {

	const { firstName, lastName, userName, password } = req.body;

  try {
    const query = `
      INSERT INTO users (first_name, last_name, username, password)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [firstName, lastName, userName, password];
    await db.query(query, values);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
    
})

app.get('/items', (req, res) => {
  res.send('Here are your items!')
})

app.post('/items', (req, res) => {
    res.send('You have created a new Item')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})