<template>
  <div class="additionCover">
    <div style="width: 50%;position: absolute ;left:25%;bottom: 5%;">
      <!-- <router-link :to="{name:'caption'}"> -->
      <router-link :to="{name:'AdditionCaption'}">
        <div style="width: 50%;float: left;"><img src="@/assets/btnCaption.png" /></div>
      </router-link>
      <router-link :to="{name:'AdditionStorm'}">
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
  .additionCover {
    width: 100%;
    height: 100vh;
    background-image: url(../../../assets/addition/cover.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* background-position: center; */
    -moz-background-size: 100% 100%;
  }
</style>
