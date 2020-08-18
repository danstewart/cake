import { Request, Response } from 'express';
import { Cake, ICake, CakeFields } from '../models/cake';

async function all(req: Request, res: Response) {
	const cakes = await new Cake().all();
	res.setHeader('Content-Type', 'application/json');
	res.send(cakes);
	return res;
}

async function one(req: Request, res: Response) {
	res.setHeader('Content-Type', 'application/json');

	const cakeId: number = parseInt(req.params.cakeId);
	const cake: Array<ICake> = await new Cake().get({ id: cakeId });

	if (!cake || cake.length == 0) {
		res.status(404);
		res.send({ error: `No cake found with id '${req.params.cakeId}'` });
		return res;
	}

	res.send(JSON.stringify(cake[0]));
	return res;
}

async function create(req: any, res: any) {
	const change: any = req.body;

	if (!validateRq(change)) {
		return res.status(400).end();
	}

	if (await new Cake().insert(req.body)) {
		return res.status(204).end();
	}

	return res.status(500).end;
}

async function update(req: any, res: any) {
	const change: any = req.body;

	if (!validateRq(change)) {
		return res.status(400).end();
	}

	if (await new Cake().update(req.params.cakeId, req.body)) {
		res.status(200);
		res.send({ msg: `Updated cake '${req.params.cakeId}'` });
		return res;
	}

	return res.status(500).end();
}

async function del(req: any, res: any) {
	if (await new Cake().del(req.params.cakeId)) {
		return res.status(204).end();
	}

	return res.status(500).end();
}

// There is probably a better way to validate JSON matches a type
// but I'm running low on time so this will do given the circumstances
function validateRq(body) {
	const reqFields = Object.keys(body);

	for (let field of reqFields) {
		if (!CakeFields[field]) {
			return false;
		}
	}

	return true;
}

export { all, one, create, update, del };
