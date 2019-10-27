<template>
  <div>
    <Collapse v-model="value2" accordion>
      <Panel name="1">
        史蒂夫·乔布斯
        <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
      </Panel>
      <Panel name="2">
        斯蒂夫·盖瑞·沃兹尼亚克
        <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
          Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC
          Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
      </Panel>
      <Panel name="3">
        乔纳森·伊夫
        <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
      </Panel>
    </Collapse>
    <ul style="width:400px;margin:10% auto;text-align: center;">
      <li v-for="(itme,key) in $router.options.routes" :key="key" v-if="itme.name!='TrainIndex'&&itme.name!='Index'">
        <router-link :to="itme.path">{{itme.meta.title}}</router-link>
      </li>
    </ul>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        value2: '1',
        list: [{
            title: '1、速度匹配',
            url: '/train/speedMatching'
          },
          {
            title: '2、双重视觉记忆',
            url: '/train/visualMemory'
          },
        ],
      }
    },
  }
</script>

<style scoped="scoped">
  ul li {
    text-align: left;
    width: 90%;
    height: 40px;
    font-size: 20px;
    list-style-type: none;
  }
</style>
