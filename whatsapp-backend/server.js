import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Messages from "./dbMessages.js";
dotenv.config();

import Pusher from "pusher";
import cors from "cors";

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1566548",
    key: "64d53ed907395821848e",
    secret: "2aaffe8b75c17eccd752",
    cluster: "us2",
    useTLS: true,
});

app.use(express.json());

app.use(cors());

const connection_url = `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@cluster0.kmvqd68.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(connection_url, {
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB is connected");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            console.log(messageDetails);
            pusher.trigger("message", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timeStamp: messageDetails.timeStamp,
                receiver: messageDetails.receiver,
            });
        } else {
            console.log("Error triggering pusher");
        }
    });
});

app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/api/v1/messages/new", async (req, res) => {
    const dbMessage = req.body;
    await Messages.create(dbMessage)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.get("/api/v1/messages/sync", async (req, res) => {
    const dbMessage = req.body;

    await Messages.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
