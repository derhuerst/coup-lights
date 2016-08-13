'use strict'

const qs = require('querystring')
const http = require('http')



const lights = (color) => new Promise((yay, nay) => {
	const req = http.request({
		hostname: '192.168.2.4',
		port:     80,
		method:   'POST',
		path:     '/change_color',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}, (res) => {
		if (res.statusCode < 200 || res.statusCode >= 300)
			nay(`status code ${res.statusCode}, connecting to 192.168.2.4:80.`)
		else yay('succes')
	})

	req.on('error', (err) =>
		nay(`${err.code} error, connecting to 192.168.2.4:80.`))

	req.end(qs.stringify({color}))
})

module.exports = lights
