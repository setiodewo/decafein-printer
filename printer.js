// Author: Emanuel Setio Dewo
// Start: 24/09/2024

const config = require('./config.js');

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.text());

const token_check = function(req, res, next) {
    if (req.headers.token == config.token) {
        next();
    } else {
        res.status(401).send('Not authorized!');
    }
}

const { ThermalPrinter, PrinterTypes } = require('node-thermal-printer');
let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: '//localhost/pos',
    removeSpecialCharacters: false,
    lineCharacter: '=',
    options: {
        timeout: 5000
    }
});

app.get('/', (req, res) => {
    res.send(config.appName);
});

app.post('/', token_check, async(req, res) => {
    printer.raw(Buffer.from(req.body));
    res.send('OK');
})

app.get('/test', async(req, res) => {
    let test = config._reset +  config._center + 
        config._big + config.appName + "\n" +
        config._normal + config._grs;
    printer.raw(Buffer.from(test));
    res.send('OK');
});

app.listen(config.port, () => {
    console.log('Decafein Printer Started...');
});