const fs = require('fs');

const errLog = (err, req, res, next) => {
    if(err) {
        fs.appendFile('ErrorLog.txt', `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - ${err.message} \n`, (error) => {
            if(error) {
                console.log("Something unexpected error occured...!");
            }
        });
        if(err.status) {
            res.status(err.status);
        } else {
            res.status(500);
        }
        res.json({
            status: 'error',
            message: err.message
        });
    }
};

module.exports = errLog;
