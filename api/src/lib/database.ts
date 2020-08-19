import { Pool, Client } from 'pg';

class Database {
	connection: any;

	async connect(): Promise<Database> {
		try {
			this.connection = await new Pool();
		} catch (err) {
			console.log(`[ERROR] Error connecting to database: ${err}`);
		}

		return this;
	}

	async query(q: string, binds?: Array<any>) {
		if (!this.connection) {
			this.connection = await this.connect();
		}

		let res;
		try {
			res = await this.connection.query(q, binds);
		} catch (err) {
			console.log(`[ERROR] Error querying database: ${err}`);
			throw err;
		}

		return res;
	}

	// Translate an object into an sql clause with bind variables
	buildClause(clause: Object): [string, Array<any>] {
		let binds = [];

		let sql = Object.keys(clause).map(k => {
			binds.push(clause[k]);
			return `"${k}" = $${binds.length}`;
		});

		return [sql.join(', '), binds];
	}

	buildInsert(data: Object): [string, Array<any>] {
		const fields = Object.keys(data).map(f => `"${f}"`).join(', ');
		const binds = Object.values(data);

		let bindKeys = [];
		for (let i = 0; i <= binds.length; i++) {
			bindKeys.push(`$${i}`);
		}

		return [`(${fields}) VALUES (${bindKeys.join(', ')})`, binds];
	}

	disconnect() {
		if (this.connection) this.connection.end();
	}
}

export { Database };
