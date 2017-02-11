#!/usr/bin/env node
'use strict'

const minimist = require('minimist')
const random = require('random-color')

const lights = require('./index')

const argv = minimist(process.argv.slice(2))

if (argv.h || argv.help) {
	process.stdout.write(`\
Usage: coup-lights [color]

color can be 6 digits ('#ffcc00'), 3 digits ('#fc0') or something like 'red'.
Remember to put the color in quote marks (' or "), otherwise your shell will
treat is as a comment.

If you don't pass a color, a random one will be picked.

Examples:
	coup-lights
	coup-lights '#ffcc77'
	coup-lights green
`)
	process.exit(0)
}

const color = argv._[0] || random().hexString().slice(1)
lights(color)
.catch((msg) => {
	process.stderr.write(msg + '\n')
	process.exit(1)
})
