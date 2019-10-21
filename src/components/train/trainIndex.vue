<template>
  <div>
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
        theme2: 'light',
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

<style>
  ul li{
    text-align:left;
    width: 90%;
    height:40px;
    font-size: 20px;
    list-style-type: none;
  }
</style>
