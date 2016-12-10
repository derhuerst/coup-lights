'use strict'

const qs = require('querystring')
const http = require('http')
const toHex = require('colornames')



const length3 = /^[0-9a-f]{3}$/i

const lights = (color) => new Promise((yay, nay) => {
	if ('string' !== typeof color) nay(new Error('color should be a string'))

	if (color.toLowerCase() === 'off') color = '#000'
	if (color[0] === '#') color = color.slice(1)
	if (toHex(color)) color = toHex(color).slice(1)
	else if (length3.test(color)) color =
		color[0] + color[0] + color[1] + color[1] + color[2] + color[2]

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
