import { Sequelize } from 'sequelize'
import { sequelize } from '../db/mysql.js'

const { DataTypes, Model } = Sequelize

class User_se extends Model {

}

User_se.init({
  username: DataTypes.CHAR,
  passworld: DataTypes.INTEGER,
  parent_id: DataTypes.INTEGER,
  is_admin: DataTypes.INTEGER,
  sex: DataTypes.INTEGER,
  create_time: {
    type: DataTypes.TIME,
    defaultValue: DataTypes.NOW
  },
  location: {
    type: DataTypes.CHAR,
    defaultValue: null
  }
}, {
  sequelize
})

const fun = async() => {
  try {
    await User_se.create({
      username: 'rove@',
      passworld: 'ddddd'
    })
  } catch (error) {
    console.trace(error)
  }
}

export { fun }
// const User = sequelize.define('se_user',
// {
//   userName: DataTypes.CHAR,
//   passworld: DataTypes.INTEGER,
//   parent_id: DataTypes.INTEGER,
//   is_admin: DataTypes.INTEGER,
//   sex: DataTypes.INTEGER,
//   create_time: {
//     type: DataTypes.INTEGER,
//     defaultValue: DataTypes.NOW
//   },
//   location: {
//     type: DataTypes.CHAR,
//     defaultValue: null,
//   }
// })
