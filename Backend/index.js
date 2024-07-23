const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
connectToMongo();
const app = express();
const localhost='127.0.0.1';
const port = 5000
app.use(cors());
app.use(express.json())
// Available Routes
app.get('/', (req, res) =>{
  res.send('Hello World');
});

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook App listening on http://${localhost}:${port}`);
})