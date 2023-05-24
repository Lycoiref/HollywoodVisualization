import Koa from 'koa'
import cors from 'koa2-cors'
import fs from 'fs'
import { getCSV } from './utils/pretreatment.js'

const app = new Koa()

app.use(cors())

app.use(async (ctx, next) => {
    const fileNames = fs.readdirSync('./data')
    console.log(fileNames)
    let csvFiles = []
    for (let file of fileNames) {
        const csvFile = await getCSV(file)
        csvFiles.push(csvFile)
    }
    const data = await generateData(csvFiles)
    console.log(data[1])
    if (ctx.url.match('/api/hollywood')) {
        ctx.body = data
    }
})

const generateData = async (csv) => {
    const result = {
        name: 'Hollywood', // 节点的名称，当前节点 label 对应的文本
        children: []
    }
    for (let i = 0; i < csv.length; i++) {
        const genres = await getAllGenres(csv[i])
        let year = {
            name: String(2007 + i),
            value: csv[i].length,
            collapsed: null,
            children: []
        }
        for (let j = 0; j < genres.length; j++) {
            let genre = {
                name: genres[j],
                value: 0,
                collapsed: true,
                children: []
            }
            for (let k = 0; k < csv[i].length; k++) {
                console.log(csv[i][k])
                console.log(csv[i][k][/Audience(.)*/])
                const color = await getColor(csv[i][k]['Audience Score'])
                // console.log(color)
                if (csv[i][k]['Genre'] === genres[j]) {
                    genre.value++
                    genre.children.push({
                        name: csv[i][k]['Film'],
                        value: csv[i][k]['Audience Score'],
                        collapsed: null,
                        itemStyle: {
                            color: color
                        },
                        children: []
                    })
                }
            }
            year.children.push(genre)
        }
        result.children.push(year)
    }
    return result
}

const getAllGenres = async (data) => {
    const genres = []
    for (let i = 0; i < data.length; i++) {
        genres.push(data[i]['Genre'])
    }
    return [...new Set(genres)]
}

const getColor = async (score) => {
    const baseColorMin = '#FF2700' // 当Audience Score为0时的颜色
    const baseColorMax = '#00FF00' // 当Audience Score为100时的颜色
    // 线性计算Audience Score对应的颜色
    const color =
        (score / 100) *
            (parseInt(baseColorMax, 16) - parseInt(baseColorMin, 16)) +
        parseInt(baseColorMin, 16)
    return '#' + Math.round(color).toString(16)
}

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
