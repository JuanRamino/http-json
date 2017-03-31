const http = require('http')

/**
 * start http server
 * @param {number} port number listening
 * @param {string} host name listening 
 * @param {function(object, http.ServerResponse)} function to handle an object
 * @return undefined
 */

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
        })

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

/**
 * send error object response to client 
 * @param {err} error
 * @param {res} http.ServerResponse
 * @return undefined
 */
exports.handleError = function(err, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end( JSON.stringify({ error: err.message }) )
}

/**
 * send data object to client
 * @param {data} object
 * @param {res} http.ServerResponse
 * @return undefined
 */
exports.handleOut = function(data, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end( JSON.stringify(data) )
}
