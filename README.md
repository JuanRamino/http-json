# HTTP J

This is a simple node http server that accepts only json.
It has been published cause I don't need to repeat this code in every simple http based service

You can install it in this way:

    npm install --save http-j

You can use it in this way:

    const server = require('http-j')

    # res is an http.ServerResponse
    function handleData(json, res) {
        res.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
        res.end()
    }

    server.start(8080, '0.0.0.0', handleData)

You should run test in this way:

    SRV_PORT=8080 SRV_HOST=0.0.0.0 npm run test

It also includes two functions to send response back to client with data or error
    
    const server = require('http-j')
    
    server.handleError(err, res)
    server.handleOut(data, res)
