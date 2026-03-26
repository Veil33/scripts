import { Database } from './models/database.js'

async function initializeDatabase() {
  const db = new Database()
  
  try {
    console.log('正在初始化数据库...')
    await db.initTables()
    console.log('数据库表创建完成')
    
    console.log('正在插入示例数据...')
    await db.insertSampleData()
    console.log('示例数据插入完成')
    
    console.log('数据库初始化完成！')
  } catch (error) {
    console.error('数据库初始化失败:', error)
  } finally {
    await db.close()
  }
}

initializeDatabase()