import * as SQLite from 'expo-sqlite';

const DB_FILE_NAME = './db.sqlite';

const MIGRATE_SQL = [
    `CREATE TABLE IF NOT EXISTS audio
    (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        cover TEXT NOT NULL,
        uri TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS playlist
    (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        cover TEXT NOT NULL,
        audios TEXT NOT NULL
    )`
]

class DBService {
    static async migrateIfNeeded() {
        const db = await SQLite.openDatabaseAsync(DB_FILE_NAME)
        for (const sql of MIGRATE_SQL) {
            await db.runAsync(sql)
        }
        await db.closeAsync()
    }

    static async getAll<T>(tableName: string): Promise<Array<T>> {
        const db = await SQLite.openDatabaseAsync(DB_FILE_NAME)
        const res = await db.getAllAsync(`SELECT * FROM ${tableName}`)
        await db.closeAsync()
        return res as Array<T>
    }

    static async getById<T>(tableName: string, id: number): Promise<T> {
        const db = await SQLite.openDatabaseAsync(DB_FILE_NAME)
        const res = await db.getFirstAsync(`SELECT * FROM ${tableName} WHERE id = ${id}`)
        await db.closeAsync()
        return res as T
    }

    static async create<T>(tableName: string, data: T): Promise<number> {
        const db = await SQLite.openDatabaseAsync(DB_FILE_NAME)
        const typedData = data as Record<string, any>

        delete typedData['id']
        const keys = Object.keys(typedData).join()
        const values = Object.entries(typedData)
            .map(([, value]) => {
                switch (typeof value) {
                    case 'string':
                        return `'${value}'`
                    case 'object':
                        return `'${JSON.stringify(value)}'`
                    default:
                        return value
                }
            })
            .join()

        const {lastInsertRowId} =
            await db.runAsync(`INSERT INTO ${tableName} (${keys}) VALUES (${values})`);

        await db.closeAsync()
        return lastInsertRowId
    }

    static async deleteById(tableName: string, id: number) {
        const db = await SQLite.openDatabaseAsync(DB_FILE_NAME)
        await db.runAsync(`DELETE FROM ${tableName} WHERE id = ${id}`)
        await db.closeAsync()
    }
}

export {DBService}