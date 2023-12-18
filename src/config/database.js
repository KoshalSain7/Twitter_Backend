import mongoose from "mongoose";

export const ConnectDB = async () => {
    mongoose.connect(process.env.MONGO_URI,
        { dbName: 'Indust-DB' },
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        },
    ).then(() => {
        console.log("Database Connected");
    }).catch((err) => {
        console.log(`Error In Database Connection ${err}`);
    })
}