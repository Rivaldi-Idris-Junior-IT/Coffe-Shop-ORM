require('dotenv').config()
const express = require("express")
const cors = require("cors")
const router = require('./src/Routes/index')

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router)

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(
        `This app is listen to PORT ${port}`
    )
})