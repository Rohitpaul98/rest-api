const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("./database/db");
app.use(require('./routes/route'))

app.listen(port, () => {
    console.log(`listening at..${port}`)
})


