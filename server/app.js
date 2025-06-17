const express = require('express');
const connectDB = require ('./models/db_connect.js');
const userRoutes = require('./routes/userRouter.js');
const cors =require('cors');

const app = express();

//db connection
connectDB();

app.use(cors());

app.get('/', (_, res) => {

    res.send("hello");
});
app.use(express.json()); 

app.use("/api", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});