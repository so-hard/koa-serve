import mysql from 'mysql2/promise'
import { MYSQL_CONF } from '../config/db.js'
import Sequelize from 'sequelize'

// 创建链接对象
let db
async function main() {
  try {
    db = await mysql.createConnection(MYSQL_CONF)
    await db.connect()
  } catch (error) {
    console.error(error)
  }
}

// @ts-ignore
const sequelize = new Sequelize({
  username: MYSQL_CONF.user,
  password: MYSQL_CONF.password,
  database: MYSQL_CONF.database,
  dialect: 'mysql',
  default: {
    freezeTableName: true
  }
})


sequelize.sync({ alter: true})


const tesxConect = async() => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
tesxConect()

export {
  db,
  main,
  sequelize
}

