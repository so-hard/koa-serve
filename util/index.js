import fs from 'fs'
import { join } from 'path'
import crypto from 'crypto'

import { BACKEND_SECRETKEY } from '../config/secret.js'

/**
 * 读取目录文件名
 * @param {String} path 路径
 * @param {()=>} fn 
 */
const getModel = (path, fn) => {
  const getFiles = (path) => {
    const files = fs.readdirSync(path)
    files.forEach(async (item) => {
      const fPath = join(path, item)
      const stat = fs.statSync(fPath)
      if (stat.isDirectory() === true) getFiles(item)
      if (stat.isFile() === true) {
        try {
          let _module = await import(`../${fPath}`)
          fn(_module.default)
        } catch (error) {
          console.error(error.message)
        }
      }
    })
  }
  getFiles(path)
}

const md5 = (content) => crypto.createHash('md5').update(content).digest('hex');

const genPassword = (password) => {
  const str = `password=${password}&key=${BACKEND_SECRETKEY}`;
  return md5(str)
}

// console.log( getModel("../routes"))
export {
  getModel,
  genPassword,
  md5
} 
