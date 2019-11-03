<template>
  <div class="multipCover">
    <div style="width: 50%;position: absolute ;left:25%;bottom: 5%;">
      <!-- <router-link :to="{name:'caption'}"> -->
      <router-link :to="{name:'MultiplicationCaption'}">
        <div style="width: 50%;float: left;"><img src="@/assets/btnCaption.png" /></div>
      </router-link>
      <router-link :to="{name:'MultiplicationStorm'}">
        <div style="width: 50%;float: left;"><img src="@/assets/btnStart.png" /></div>
      </router-link>
    </div>


  </div>
</template>

<script>
  export default {
    methods: {},
  }
</script>

<style>
  .multipCover {
    width: 100%;
    height: 100vh;
    background-image: url(../../../assets/multiplication/cover.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* background-position: center; */
    -moz-background-size: 100% 100%;
  }
</style>
