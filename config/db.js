const { Pool, Client } = require('pg')

const db = {
  user: 'postgres',
  host: 'localhost',
  database: 'idealivery',
  password: 'arip33',
  port: 4533,
}

const client = new Client(db)
client.connect()

const pool = new Pool(db)

module.exports = {client, pool};


// ssh -L 4533:localhost:5432 root@103.82.240.66 -p 8288
// e9Czb01ON04gUShBa5
