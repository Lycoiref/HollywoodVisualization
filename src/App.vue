<template>
    <div class="app">
        <div id="color-table">
            颜色对照表：
            <div class="color-item">
                <div class="name">少</div>
                <div class="color-bar"></div>
                <div class="name">多</div>
            </div>
            注：节点大小越大，代表该类型的电影越多
        </div>
        <div id="main"></div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import axios from 'axios'
import { onMounted } from 'vue'

onMounted(async () => {
    const res = await axios.get('http://localhost:3000/api/hollywood')
    console.log(res.data)
    const data = res.data
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 绘制图表
    myChart.setOption({
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',
                data: [data],
                top: '18%',
                bottom: '14%',
                layout: 'radial',
                symbol: 'emptyCircle',
                symbolSize: 7,
                initialTreeDepth: 3,
                animationDurationUpdate: 750,
                emphasis: {
                    focus: 'descendant'
                }
            }
        ]
    })
})
</script>

<style scoped lang="less">
.app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    #color-table {
        position: fixed;
        z-index: 999;
        top: 15px;
        right: 20px;

        .color-item {
            display: flex;
            align-items: center;
            margin: 10px 0;

            .color-bar {
                width: 100px;
                height: 8px;
                border-radius: 4px;
                background-image: linear-gradient(90deg, #00ff00, #ff2700);
                margin: 0 10px;
            }

            .name {
                font-size: 12px;
            }
        }
    }

    #main {
        width: 100%;
        height: 100%;
    }
}
</style>
