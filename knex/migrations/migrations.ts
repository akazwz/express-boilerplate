import { Knex } from 'knex'

export function up (knex:Knex) {
	return knex.schema
		.createTable('users', (table)=>{
			table.increments('id').primary()
			table.string('username').unique()
			table.string('password')
		})
		.createTable('posts', (table)=>{
			table.increments('id').primary()
			table.string('title')
		})
}

export function down (knex:Knex) {
	return knex.schema
		.dropTable('users')
		.dropTable('posts')
}