require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const artRoutes =  require('./routers/art');
const userRoutes = require('./routers/user');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:3000", "https://another-collaj-test.onrender.com", "https://collaj-test.onrender.com"],
    })
);
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/art', artRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

mongoose.connect(process.env.MONGO_CONNECT)
    .then(() => {
        app.listen(process.env.PORT, () => { console.log('Listening on port', process.env.PORT); })
    }).catch((error) => {
            console.log(error);
    })
