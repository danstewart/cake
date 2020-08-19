import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as cakes from './controllers/cakes';

dotenv.config();

const app = express();
const port = 8001;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello, World!'));

app.get('/cakes', (req, res) => cakes.all(req, res));
app.get('/cakes/:cakeId', (req, res) => cakes.one(req, res));
app.post('/cakes', (req, res) => cakes.create(req, res));
app.put('/cakes/:cakeId', (req, res) => cakes.update(req, res));
app.delete('/cakes/:cakeId', (req, res) => cakes.del(req, res));

app.listen(port, () => {
	console.log(`[server]: Server is running at https://localhost:${port}`);
});
