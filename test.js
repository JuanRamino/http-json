const expect = require('chai').expect
    , fetch = require('node-fetch')
    , server =  require('./')

const PORT = process.env.SRV_PORT
    , HOST = process.env.SRV_HOST

function handleData(json, res) {
    server.handleOut({ message: 'hello ramino'}, res)
}

server.start(PORT, HOST, handleData)

describe('Test server', function() {

    it('respond, hello ramino', function(done) {

        const body = {
            message: 'hello bitch'
        }
        var options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 
                'Content-Type': 'application/json'
            }
        }

        fetch(`http://${HOST}:${PORT}`, options)
        .then(function(res) {
            return res.json()
        })
        .then(function(json) {
            expect(json.message).to.be.equal('hello ramino')
            done()
        })
    })
    
    it('do not want invalid json', function(done) {

        var options = {
            method: 'POST',
            body: 'Not a JSON',
            headers: { 
                'Content-Type': 'application/json'
            }
        }

        fetch(`http://${HOST}:${PORT}`, options)
        .then(function(res) {
            expect(res.status).to.be.equal(400)
            done()
        })
    })

    it('do not want GET requests', function(done) {
        fetch(`http://${HOST}:${PORT}`)
        .then(function(res) {
            expect(res.status).to.be.equal(405)
            done()
        })
    })

    it('do not want requests without header, Content-Type: application/json', function(done) {

        var options = {
            method: 'POST',
            body: 'Not a JSON',
            headers: { 
                'Content-Type': 'text/plain'
            }
        }

        fetch(`http://${HOST}:${PORT}`, options)
        .then(function(res) {
            expect(res.status).to.be.equal(400)
            done()
        })
    })
    
})