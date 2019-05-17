
'use strict'

function map(temp, real) {
    for (const key in temp) {
        if (temp.hasOwnProperty(key)) {
            temp[key] = real[key];
        }
    }
}

module.exports = { map };