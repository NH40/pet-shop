const express = require('express')
const router = express.Router()

const db = {
	run: (sql, params, callback) => {
		console.log('[SIMULATED DB] Executing SQL:', sql)
		console.log('[SIMULATED DB] With parameters:', params)
		if (callback) callback(null)
	},
}

router.get('/send', (req, res) => {
	console.log('[SIMULATED DB] SELECT query would run here')
	res.json({})
})

router.post('/send', (req, res) => {
	const { message, user } = req.body
	const sql =
		"INSERT INTO messages (content, user, created_at) VALUES (?, ?, datetime('now'))"
	const params = [message || 'no message', user || 'anonymous']
	db.run(sql, params, err => {
		if (err) {
			console.error('[SIMULATED DB] Error would be:', err)
		} else {
			console.log('[SIMULATED DB] Insert simulated successfully')
		}
	})

	res.json({ status: 'OK', message: 'request processed' })
})

module.exports = router
