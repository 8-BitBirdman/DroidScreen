import adb from 'adbkit'
const { execFile } = require('child_process')
const fixPath = require('fix-path')
fixPath()
const client = adb.createClient()
const debug = require('debug')('scrcpy')

let _tracker = null
const onDevices = sender => {
	if (_tracker) {
		// already tracking; just rebind sender
		_tracker._sender = sender
		return
	}
	client.trackDevices()
		.then(function (tracker) {
			_tracker = tracker
			_tracker._sender = sender
			tracker.on('add', function (device) {
				debug('Device %s was plugged in', device.id)
				client.listDevices().then(function (devices) {
					debug(devices)
					_tracker._sender.send('devices', devices)
				})
			})
			tracker.on('remove', function (device) {
				debug('Device %s was unplugged', device.id)
				client.listDevices().then(function (devices) {
					debug(devices)
					_tracker._sender.send('devices', devices)
				})
			})
			tracker.on('end', function () {
				debug('Tracking stopped')
				_tracker = null
			})
		})
		.catch(function (err) {
			debug('Something went wrong:', err.stack)
		})
}
const connect = ({ sender }, args) => {
	const { id, ip } = args
	const success = 'Successfully opened wireless connection'
	const fail = 'Failed to open wireless connection'
	const tryConnect = (host, port) => {
		const p = port ? client.connect(host, port) : client.connect(host)
		return p.then(() => {
			sender.send('connect', { success: true, message: success })
		}).catch(() => {
			sender.send('connect', { success: false, message: fail })
		})
	}
	if (id) {
		client.tcpip(id)
			.then(port => tryConnect(ip, port))
			.catch(() => tryConnect(ip))
	} else {
		tryConnect(ip)
	}
}

const disconnect = ({ sender }, ip) => {
	client.disconnect(ip).then(id => {
		debug(id)
		sender.send('disconnect', { success: true, message: 'Device shutdown succeeded' })
	}).catch(err => {
		debug(err)
		sender.send('disconnect', { success: false, message: 'Device shutdown failed' })
	})
}

const mdnsDiscover = ({ sender }) => {
	execFile('adb', ['mdns', 'services'], (err, stdout) => {
		if (err) {
			sender.send('mdns', { success: false, devices: [] })
			return
		}
		const lines = stdout.split('\n').filter(l => l.includes('_adb-tls-'))
		const map = {}
		lines.forEach(line => {
			const parts = line.trim().split(/\s+/)
			if (parts.length < 3) return
			const instanceName = parts[0]
			const serviceType = parts[1]
			const addr = parts[parts.length - 1]
			// Serial is embedded in instance name: adb-<serial>-<suffix>
			const match = instanceName.match(/^adb-(.+)-[^-]+$/)
			const serial = match ? match[1] : instanceName
			if (!map[serial]) map[serial] = { serial, name: `Phone (${serial.slice(0, 8)}...)` }
			if (serviceType.includes('pairing')) {
				map[serial].pairAddr = addr
			} else if (serviceType.includes('connect')) {
				map[serial].connectAddr = addr
			}
		})
		sender.send('mdns', { success: true, devices: Object.values(map) })
	})
}

// Validate IP:port format to prevent shell-arg abuse
const ADDR_RE = /^[0-9a-fA-F.:[\]]+:\d{1,5}$/
const CODE_RE = /^\d{6}$/

const pairDevice = ({ sender }, { addr, code }) => {
	if (!ADDR_RE.test(addr) || !CODE_RE.test(code)) {
		sender.send('pair', { success: false })
		return
	}
	execFile('adb', ['pair', addr, code], (err, stdout, stderr) => {
		const output = (stdout + stderr).toLowerCase()
		if (err || output.includes('failed') || output.includes('error')) {
			sender.send('pair', { success: false })
			return
		}
		sender.send('pair', { success: true })
	})
}

const connectDirect = ({ sender }, { addr }) => {
	if (!ADDR_RE.test(addr)) {
		sender.send('connectDirect', { success: false })
		return
	}
	execFile('adb', ['connect', addr], (err, stdout, stderr) => {
		const output = (stdout + stderr).toLowerCase()
		if (err || output.includes('failed') || output.includes('error') || output.includes('unable')) {
			sender.send('connectDirect', { success: false })
			return
		}
		sender.send('connectDirect', { success: true })
	})
}

export default {
	connect, disconnect, onDevices, mdnsDiscover, pairDevice, connectDirect
}
