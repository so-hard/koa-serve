const env = process.env.NODE_ENV
let MYSQL_CONF = null

if (env === 'dev') {
  MYSQL_CONF = {
    user: 'root',
    password: '123456',
    database: 'test'
  }
}

export {
  MYSQL_CONF
}
