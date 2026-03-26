import express, { Request, Response } from 'express'
import cors from 'cors'
import { Database } from './models/database.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const db = new Database()

app.get('/api/items', async (req: Request, res: Response) => {
  try {
    const { type, keyword } = req.query
    const items = await db.getItems(
      type as string | undefined,
      keyword as string | undefined
    )
    
    res.json({
      items,
      total: items.length
    })
  } catch (error) {
    console.error('获取影视列表失败:', error)
    res.status(500).json({ 
      error: '获取影视列表失败',
      items: [],
      total: 0
    })
  }
})

app.get('/api/items/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const item = await db.getItemById(id)
    
    if (!item) {
      return res.status(404).json({ error: '影视条目不存在' })
    }
    
    res.json(item)
  } catch (error) {
    console.error('获取影视详情失败:', error)
    res.status(500).json({ error: '获取影视详情失败' })
  }
})

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`)
})

process.on('SIGINT', async () => {
  console.log('正在关闭服务器...')
  await db.close()
  process.exit(0)
})