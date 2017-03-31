const http = require('http')

exports.start = function(port, host, handleData) {

    function server(req, res) {

        if (req.method != 'POST') {
            res.writeHead(405, { 'Content-Type': 'text/plain', 'Allow': 'POST' })
            return res.end() 
        }

        if (req.headers['content-type'] != 'application/json') {
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            return res.end()
        }

        let jsonString = ''
        let json
        
        req.on('data', function (data) {
            jsonString += data
        });

        req.on('end', function () {
            
            try {
                json = JSON.parse(jsonString)
            } catch (ex) {
                res.writeHead(400, { 'Content-Type': 'text/plain' })
                return res.end()
            }

            handleData(json, res)
        })
    }

    http.createServer(server).listen(port, host)
}
