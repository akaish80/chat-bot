const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

require("ts-node").register({
    transpileOnly: true,
    compilerOptions: {
        module: "commonjs",
    },
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const router = express.Router(); //

function safeLoadJson(filePath) {
    try {
        const txt = fs.readFileSync(filePath, "utf8");
        return JSON.parse(txt);
    } catch (err) {
        // return null so caller can try alternate paths
        return null;
    }
}

const BOT_MESSAGE = { Hi: "Hello", Bye: "See You, Thank you", 'How are you': 'Pretty good, how are you?' };

let loadedChatJSON;

function loadChatJSON() {
    const nestedPath = path.join(__dirname, "..","data", "chat.json");
    return safeLoadJson(nestedPath);
}

router.get("/chat/:id", (req, res) => {
    const id = req.params.id.toString();
    const resultJSON = loadedChatJSON?.chats?.find((item) => item.id === id);
    res.send(resultJSON);
});

router.post("/chat/newChat", (req, res) => {
    const newChatId = loadedChatJSON?.chats?.length + 1;
    const newChat = {
        id: newChatId.toString(),
        name: `chat ${newChatId}`,
        messages: [],
    };

    loadedChatJSON.chats.push(newChat);
    res.send(loadedChatJSON);
});

router.post("/chat/newMessage", (req, res) => {
    console.log(req.body.chatId);
    const { chatId, message } = req.body;

    const insertedChat = loadedChatJSON.chats.map((item) => {
        if (item.id === chatId) {
            const updateMessages = [...item.messages, message];
            const botResponse = {
                id: `${updateMessages.length + 1}`,
                message: BOT_MESSAGE[message.message] || "Hello there how are you",
                isSender: false,
            };

            return {
                ...item,
                messages: [...updateMessages, botResponse],
            };
        }
        return item;
    });

    loadedChatJSON.chats = insertedChat;
    res.send(loadedChatJSON);
});

router.get("/chat", (req, res) => {
    const chats = loadedChatJSON.chats.map((item) => {
        const { id, name } = item;
        return {
            id,
            name,
        };
    });
    res.send({ chats });
});

router.get("/chats", (req, res) => {
    res.send(loadedChatJSON);
});

const port = process.env.PORT || 3947;

app.use("/", router);

app.listen(port, () => {
    loadedChatJSON = loadChatJSON();
    console.log(`Chatbot API listening on http://localhost:${port} `);
});