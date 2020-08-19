import { Database } from '../lib/database';

// List of valid fields to validate JSON against
const Fields = {
	name: 1,
	comment: 1,
	imageUrl: 1,
	yumFactor: 1,
};

interface Insertable {
	name?: string;
	comment?: string;
	imageUrl?: string;
	yumFactor?: number;
}

interface Queryable extends Insertable {
	id?: number;
	created?: string;
}

class Cake {
	async all(): Promise<Array<Queryable>> {
		let db = await new Database().connect();
		let res = await db.query('SELECT * FROM cakes ORDER BY id ASC');
		return res.rows;
	}

	async get(query: Queryable): Promise<Array<Queryable>> {
		let db = await new Database().connect();
		let [sql, binds] = db.buildClause(query);
		let res = await db.query(`SELECT * FROM cakes WHERE ${sql}`, binds);
		return res.rows;
	}

	async insert(data: Insertable): Promise<boolean> {
		let db = await new Database().connect();
		let [sql, binds] = db.buildInsert(data);

		try {
			await db.query(`INSERT INTO cakes ${sql}`, binds);
			return true;
		} catch (err) {
			console.error(`[ERROR] Error inserting cake: ${JSON.stringify(data)}`);
			return false;
		}
	}

	async update(id, change: Insertable): Promise<boolean> {
		let db = await new Database().connect();

		let [sql, binds] = db.buildClause(change);

		try {
			await db.query(`UPDATE cakes SET ${sql} WHERE id = $${binds.length + 1}`, [...binds, id]);
			return true;
		} catch (err) {
			console.error(`[ERROR] Error updating cake '${id}'`);
			return false;
		}
	}

	async del(id) {
		let db = await new Database().connect();

		try {
			await db.query(`DELETE FROM cakes WHERE id = $1`, [id]);
			return true;
		} catch (err) {
			console.error(`[ERROR] Error deleting cake '${id}'`);
			return false;
		}
	}
}

export { Cake, Queryable as ICake, Fields as CakeFields };
