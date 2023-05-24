import { parse } from 'csv-parse'
import fs from 'fs'

// 解析csv文件
export const getCSV = async (fileName) => {
    const records = []
    const parser = fs.createReadStream(`./data/${fileName}`).pipe(
        parse({
            columns: true,
            skip_empty_lines: true,
            trim: true
        })
    )
    for await (const record of parser) {
        records.push(record)
    }
    return records
}
