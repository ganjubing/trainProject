<template>
  <div>
    <ul v-for="(itme,key) in list" :key="key">
      <li>
        <router-link :to="itme.url">{{itme.title}}</router-link>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    data() {
      return {
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
</style>
