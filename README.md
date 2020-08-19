# Cake

Basic Cake CRUD demo site.  

---

## Set up
#### Install dependancies
```
dnf install npm
npm install -g yarn
yarn global add parcel n pm2 ts-node
n latest
```

#### Config
Add the following to `api/.env`
```
PGUSER=cake
PGPASSWORD=<PASSWORD>
PGDATABASE=cake
PGPORT=<PORT>
PGHOST=<HOST>
```

#### Database
```
dnf install postgresql-server libpq-devel postgresql-contrib
postgresql-setup --initdb
systemctl enable postgresql.service
systemctl start postgresql.service

sudo -u postgres psql
> CREATE DATABASE cake;
> CREATE USER cake WITH ENCRYPTED PASSWORD 'password';
> GRANT ALL PRIVILEGES ON DATABASE cake TO cake;
> \c cakes

CREATE TABLE cakes (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(100) NOT NULL,
	comment TEXT DEFAULT '',
	"imageUrl" VARCHAR(300) DEFAULT '',
	"yumFactor" SMALLINT NOT NULL,
	created TIMESTAMP DEFAULT now()
)
```

---

## Running
```
cd frontend && yarn install && yarn start
cd api && yarn install && yarn start
```

## Deploying
```
# nginx
sudo cp nginx/{api.,}cake.danstewart.xyz /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/cake.danstewart.xyz /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.danstewart.xyz /etc/nginx/sites-enabled/

# frontend
cd frontend && yarn build
sudo ln -s $(pwd)/dist/ /data/www/cake.danstewart.dev

# api
cd api && yarn build && pm2 start src/build/index.js
pm2 list
pm2 restart $id

sudo service nginx restart


# certbot
sudo certbot --nginx
```
