import { Knex, knex } from 'knex'

const config:Knex.Config = {
	client: 'mysql2',
	connection: {
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	},
	migrations: {
		directory: './knex/migrations',
		loadExtensions: ['.ts'],
	},
	seeds: {
		directory: './knex/seeds',
		loadExtensions: ['.ts'],
	},
}
export const db:Knex = knex(config)

