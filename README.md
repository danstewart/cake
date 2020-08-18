# Cake

Basic Cake CRUD demo site.  

---

## Set up
#### Install dependancies
```
dnf install yarn
yarn global add parcel
yarn global add n
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

CREATE TABLE cakes (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(100) NOT NULL,
	comment TEXT DEFAULT '',
	"imageUrl" VARCHAR(50) DEFAULT '',
	"yumFactor" SMALLINT NOT NULL,
	created TIMESTAMP DEFAULT now()
)
```

---

## Running
```
cd frontend && yarn start
cd api && yarn start
```

## Building
```
cd frontend && yarn build
cd api && yarn build
```
