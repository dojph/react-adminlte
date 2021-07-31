const path = require('path');

module.exports = {
    webpack: {
        alias: {
            'doj-react-adminlte': path.resolve(__dirname, 'src/components')
        },
    }
};