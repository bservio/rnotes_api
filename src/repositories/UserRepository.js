const sqliteConnection = require("../database/sqlite")

class UserRepository {
	async findByEmail(email) {
		const database = await sqliteConnection()
		const user = await database.get("SELECT * FROM users WHERE EMAIL = (?)", [email])

		return user
	}

	async create() {
		const database = await sqliteConnection()
		const userId = await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
			[name, email, password]
		);

		return { id: userId }
	}
}

module.exports = UserRepository