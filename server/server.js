require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const User = require('./models/user');
const userRouter = require('./routes/users');

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(config.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB has been connected...');
  })
  .catch((err) => console.log(err));

app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
