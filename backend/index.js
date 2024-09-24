const express = require('express')

const app = express();

const PORT = 8000;

const db = require('./models')

const userRoutes=require('./routes/v1/index')

app.use(express.json());


app.use('/api',userRoutes);

db.sequelize.sync().then(() => {
    console.log("database connected")
    app.listen(PORT, () => {
        console.log("App is listening in port 8000");
    })
}).catch((err) => {
    console.log("unable to connect to database", err)
})
