import { parse } from 'csv-parse'
import fs from 'fs'

const main = async () => {
    const fileNames = fs.readdirSync('../data')
    console.log(fileNames)
    const data = await getCSV(fileNames[0])
    console.log(data[1])
    // for (const fileName of fileNames) {
    //     console.log(fileName);
    //     const file = fs.readFileSync(`../data/${fileName}`, 'utf8')
    //     const data = parse(file, {
    //         columns: true,
    //         skip_empty_lines: true
    //     })
    //     console.log(data);
    // }
    // console.log(data);
    // const roads = await pretreatment(data)
    // return roads
}

const getCSV = async (fileName) => {
    const records = []
    const parser = fs.createReadStream(`../data/${fileName}`).pipe(
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

main()
