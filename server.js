const express = require('express');
const { Client } = require("@notionhq/client")
const cors = require('cors');
var bodyParser = require('body-parser');
var JSONParser = bodyParser.json();
require('dotenv').config()

const app = express();
app.use(cors());

const PORT = 4000;
const HOST = "localhost";


const client = new Client({ auth: `${process.env.NOTION_API_KEY}` });
const databaseId = `${process.env.NOTION_DATABASE_ID}`;

//POST request
// POST name, phone, message to database 

app.post('/submitForm', JSONParser, async (req, res) => {
    const { name, phone, message } = req.body;
    console.log(name, phone, message);

    try {
        const response = await client.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: name,
                            },
                        },
                    ],
                },
                Phone: {
                    rich_text: [
                        {
                            text: {
                                content: phone,
                            },
                        },
                    ],
                },
                Message: {
                    rich_text: [
                        {
                            text: {
                                content: message,
                            },
                        },
                    ],
                },
            },
        });
        console.log(response);
        console.log("Success! Entry added.");
        res.json(response);
    } catch (error) {
        console.error(error.body);
        res.status(500).json({ error: error.body });
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);

});