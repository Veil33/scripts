import sqlite3 from 'sqlite3'
import path from 'path'

const DB_PATH = path.join(__dirname, '../../data/movie_library.db')

export interface MovieItem {
  id: number
  title: string
  type: 'movie' | 'tv' | 'anime'
  poster: string
  year: number
  genres: string
  summary: string
  rating?: number
  source: string
  source_id: string
  updated_at: string
}

export class Database {
  private db: sqlite3.Database

  constructor() {
    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('数据库连接失败:', err)
      } else {
        console.log('数据库连接成功')
      }
    })
  }

  initTables(): Promise<void> {
    return new Promise((resolve, reject) => {
      const sql = `
        CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          type TEXT NOT NULL CHECK(type IN ('movie', 'tv', 'anime')),
          poster TEXT NOT NULL,
          year INTEGER NOT NULL,
          genres TEXT NOT NULL,
          summary TEXT NOT NULL,
          rating REAL,
          source TEXT NOT NULL,
          source_id TEXT NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_items_type ON items(type);
        CREATE INDEX IF NOT EXISTS idx_items_title ON items(title);
        CREATE INDEX IF NOT EXISTS idx_items_year ON items(year);
      `

      this.db.exec(sql, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  insertSampleData(): Promise<void> {
    return new Promise((resolve, reject) => {
      const sampleData = [
        {
          title: '肖申克的救赎',
          type: 'movie' as const,
          poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
          year: 1994,
          genres: '剧情,犯罪',
          summary: '一个银行家因为妻子和她的情人被杀而被判无期徒刑，在肖申克监狱中，他逐渐获得狱友的信任并帮助典狱长洗黑钱。',
          rating: 9.7,
          source: 'sample',
          source_id: 'sample_001'
        },
        {
          title: '权力的游戏',
          type: 'tv' as const,
          poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
          year: 2011,
          genres: '剧情,奇幻,冒险',
          summary: '故事背景设定在一个虚构的世界，主要讲述王国各方的权力斗争。',
          rating: 9.3,
          source: 'sample',
          source_id: 'sample_002'
        },
        {
          title: '进击的巨人',
          type: 'anime' as const,
          poster: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b92?w=300&h=450&fit=crop',
          year: 2013,
          genres: '动作,奇幻,剧情',
          summary: '人类生活在巨大的城墙内，墙外有食人的巨人。主角艾伦立志要消灭所有巨人。',
          rating: 9.1,
          source: 'sample',
          source_id: 'sample_003'
        },
        {
          title: '阿甘正传',
          type: 'movie' as const,
          poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop',
          year: 1994,
          genres: '剧情,爱情',
          summary: '阿甘是一个智商只有75的低能儿，但他善良单纯，最终获得了不平凡的人生。',
          rating: 9.5,
          source: 'sample',
          source_id: 'sample_004'
        },
        {
          title: '绝命毒师',
          type: 'tv' as const,
          poster: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=300&h=450&fit=crop',
          year: 2008,
          genres: '剧情,犯罪,惊悚',
          summary: '一位高中化学老师被诊断出癌症后，开始制造毒品来保障家庭未来。',
          rating: 9.6,
          source: 'sample',
          source_id: 'sample_005'
        },
        {
          title: '你的名字',
          type: 'anime' as const,
          poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=450&fit=crop',
          year: 2016,
          genres: '爱情,奇幻,动画',
          summary: '两个素未谋面的男女在梦中交换身体，并逐渐产生感情的故事。',
          rating: 8.9,
          source: 'sample',
          source_id: 'sample_006'
        }
      ]

      const insertSql = `
        INSERT OR IGNORE INTO items (title, type, poster, year, genres, summary, rating, source, source_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

      let completed = 0
      const total = sampleData.length

      sampleData.forEach(item => {
        this.db.run(insertSql, [
          item.title,
          item.type,
          item.poster,
          item.year,
          item.genres,
          item.summary,
          item.rating,
          item.source,
          item.source_id
        ], (err) => {
          if (err) {
            console.error('插入数据失败:', err)
            reject(err)
          } else {
            completed++
            if (completed === total) {
              console.log('示例数据插入完成')
              resolve()
            }
          }
        })
      })
    })
  }

  getItems(type?: string, keyword?: string): Promise<MovieItem[]> {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM items WHERE 1=1'
      const params: any[] = []

      if (type) {
        sql += ' AND type = ?'
        params.push(type)
      }

      if (keyword) {
        sql += ' AND title LIKE ?'
        params.push(`%${keyword}%`)
      }

      sql += ' ORDER BY updated_at DESC'

      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows as MovieItem[])
        }
      })
    })
  }

  getItemById(id: number): Promise<MovieItem | null> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM items WHERE id = ?'
      this.db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row as MovieItem | null)
        }
      })
    })
  }

  close(): Promise<void> {
    return new Promise((resolve) => {
      this.db.close((err) => {
        if (err) {
          console.error('数据库关闭失败:', err)
        }
        resolve()
      })
    })
  }
}