const {client, pool} = require('./db');

// client
//   .query('SELECT * FROM dt_customer')
//   .then(res => console.log(res))
//   .catch(e => console.error(e.stack))

// client.query('SELECT * FROM dt_customer', (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows)
//   }
// })

const saveMessageToDB = async (data, status_pesan) => {
  console.log(data);
  //
  let query = {};
  // penerima admin
  if(data.to_role_pengguna_online === 'admin') {
    if(data.role_pengguna_online === 'customer') {
      query = {
        text: 'INSERT INTO trx_chatting(id_user, id_customer, content, status_pesan, time, jenis_sender) VALUES($1, $2, $3, $4, $5, $6)',
        values: [data.to_id_pengguna_online, data.id_pengguna_online, data.message, status_pesan, data.time, data.sender],
      }
    } else {
      query = {
        text: 'INSERT INTO trx_chatting(id_user, id_driver, content, status_pesan, time, jenis_sender) VALUES($1, $2, $3, $4, $5, $6)',
        values: [data.to_id_pengguna_online, data.id_pengguna_online, data.message, status_pesan, data.time, data.sender],
      }
    }
  }
  // penerima customer
  if(data.to_role_pengguna_online === 'customer') {
    if(data.role_pengguna_online === 'admin') {
      query = {
        text: 'INSERT INTO trx_chatting(id_user, id_customer, content, status_pesan, time, jenis_sender) VALUES($1, $2, $3, $4, $5, $6)',
        values: [data.id_pengguna_online, data.to_id_pengguna_online, data.message, status_pesan, data.time, data.sender],
      }
    } else {
      query = {
        text: 'INSERT INTO trx_chatting(id_driver, id_customer, content, status_pesan, time, jenis_sender, id_pengiriman) VALUES($1, $2, $3, $4, $5, $6, $7)',
        values: [data.id_pengguna_online, data.to_id_pengguna_online, data.message, status_pesan, data.time, data.sender, data.id_pengiriman],
      }
    }
  }
  // penerima driver
  if(data.to_role_pengguna_online === 'driver') {
    if(data.role_pengguna_online === 'admin') {
      query = {
        text: 'INSERT INTO trx_chatting(id_user, id_driver, content, status_pesan, time, jenis_sender) VALUES($1, $2, $3, $4, $5, $6)',
        values: [data.id_pengguna_online, data.to_id_pengguna_online, data.message, status_pesan, data.time, data.sender],
      }
    } else {
      query = {
        text: 'INSERT INTO trx_chatting(id_customer, id_driver, content, status_pesan, time, jenis_sender, id_pengiriman) VALUES($1, $2, $3, $4, $5, $6, $7)',
        values: [data.id_pengguna_online, data.to_id_pengguna_online, data.message, status_pesan, data.time, data.sender, data.id_pengiriman],
      }
    }
  }

  // await client.query(query)
  //   .then(res => console.log(res.rows))
  //   .catch(e => console.log(e.stack));

  await client.query(query)
    .then(res => {
      console.log('THEN============>');
      console.log(res.rows)
    })
    .catch(e => {
      console.log('CATCH');
      console.log(e.stack)
    });
}

checkingSidToDB = async (data) => {
  let table;
  let is_pengguna;
  if(data.role_pengguna_online === 'admin') {
    table = 'sys_user';
    is_pengguna = 'id_user';
  }
  if(data.role_pengguna_online === 'driver') {
    table = 'dt_driver';
    is_pengguna = 'id_driver';
  }
  if(data.role_pengguna_online === 'customer') {
      table = 'dt_customer';
      is_pengguna = 'id_customer';
  }
  let query = {
    text: `SELECT COUNT(*) FROM ${table} WHERE id_session = $1`,
    values: [data.sid],
  }

  // return await client
  return await client.query(query)
  .then(res => res.rows[0])
  .catch(e => false)

  // return client.query(query, (err, res) => {
  //     if (err) {
  //       return err.stack;
  //     } else {
  //       return res.rows;
  //     }
  //   })
}


// pull jadwal driver pengiriman
const pullJadwalDriverPengiriman = async (data) => {
  const query = {
    text: "SELECT * FROM trx_pengiriman WHERE id_driver = $1 AND to_char(waktu_pengambilan,'YYYY-MM-DD') = $2",
    values: [data.id_driver, data.date],
  }
  return await client.query(query)
  .then(res => res.rows)
  .catch(e => false)
}


module.exports = {saveMessageToDB, checkingSidToDB, pullJadwalDriverPengiriman};


// SELECT * FROM TRX_PENGIRIMAN WHERE ID_DRIVER = ${ID_DRIVER}
