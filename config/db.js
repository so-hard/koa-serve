const env = process.env.NODE_ENV
let MYSQL_CONF = null

if (env === 'dev') {
  MYSQL_CONF = {
    user: 'root',
    password: '123456',
    database: 'test_admin'
  }
}

export {
  MYSQL_CONF
}
