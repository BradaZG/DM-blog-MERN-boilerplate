require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB has been connected...');
  })
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
