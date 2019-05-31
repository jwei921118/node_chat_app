
'use strict'

function mapObject(temp, real) {
    for (const key in temp) {
        if (temp.hasOwnProperty(key)) {
            temp[key] = real[key];
        }
    }
}

module.exports = { mapObject };