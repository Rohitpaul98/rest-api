const mongoose = require("mongoose");//created mongoose instance

mongoose.connect('mongodb://localhost:27017/myapp', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection is successfull");
}).catch((error) => {
    console.log("connection unsuccessfull" + error);
})

//connection file