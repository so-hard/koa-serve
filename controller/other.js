import axios from 'axios'
import { md5 } from '../util/index.js'

let Token

const Axios = axios.create({
  baseURL: 'http://117.187.66.166:32613/'
})

Axios.interceptors.request.use(
  config => {
    if (Token) { config.headers['Access-Token'] = Token }
    return config
  }
)

Axios.interceptors.response.use(res => {
  const { status, data } = res
  if (status === 200) {
    return Promise.resolve(data)
  } else {
    return Promise.reject(data.msg)
  }
})

/**
 *
 * @param {object} data
 * @param {string} data.loginId
 * @param {string} data.password
 */
export const getTokenFromDatrix = async(data) => {
  // console.log(data)
  // data = JSON.parse(data)
  data.password = md5(data.passworld)
  data.from = 0
  data.type = 0
  try {
    const res = await Axios.post('/api/as/user/login', data)
    // console.log(res)
    const { code, result } = res
    if (code === 200) {
      const { link_root, token, id } = result.info
      Token = result.token
      // await getList(link_root)
      await createFile('photo', link_root, id)
      return Promise.resolve(result)
    } else {
      return Promise.reject(result)
    }
  } catch (error) {
    console.error(error)
  }
}

async function createFile(fileName, parentId, userId) {
  try {
    const res = await Axios.post('/api/af/file/createFromLink', {
      fileName, parentId, userId, directCheck: true, isDir: true, fileSize: 0,
      lParentId: '2020102118_42b67dc2e68e2e69f3225b70ebc4977b_lv0',
      mode: 0
    })
    const { code, result } = res
    if (code === 200) {
      return Promise.resolve(result)
    } else {
      return Promise.reject(res)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

async function upLoadeFile(parentId,parentId,fileName,fileName) {
  try {
    let res = Axios.post("/api/af/file/uploadOnce", {
      mode:0,parentId,parentId,fileName,directCheck:false,isDir:false,
      fileName;
    })
    console.log(res)
  } catch (error) {
    console.error(error)
  }
}

async function getList(parentId) {
  try {
    const res = await Axios.post('/api/as/file/listLink', { mode: 0,
      page: 1,
      pageSize: 10000,
      showDir: 1,
      parentId: 'e60653302df41b796eea6e6bcb0ce182'
    })
    // const { code, result } = res
    console.log(res)
  } catch (error) {
    console.trace(error)
  }
}

// export cosnt createFile = (data) => {
//   const res =
// }
