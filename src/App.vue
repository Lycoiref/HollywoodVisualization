<template>
    <div class="app">
        111
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

    #main {
        width: 100%;
        height: 100%;
    }
}
</style>
