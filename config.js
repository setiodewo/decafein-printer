// Author: Emanuel Setio Dewo, 24/09/2024

const config = {
    appName: 'Decafein Printer Spooler',
    port: 4001,
    token: 'decafein20240924!',

    _reset: '\x1B@',
    _center: '\x1Ba\x01',
    _left: '\x1Ba\x00',
    _big: '\x1D!\x01',
    _normal: '\x1D!\x00',

    _grs: "--------------------------------\n"
}

module.exports = config;