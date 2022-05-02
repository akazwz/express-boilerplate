import { Knex, knex } from 'knex'

const config:Knex.Config = {
	client: process.env.DB_CLIENT,
	connection: {
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	},
}
const db = knex(config)

export default db

