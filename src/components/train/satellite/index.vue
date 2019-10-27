<template>
  <div class="cover">
    <div style="width: 50%;position: absolute ;left:25%;bottom: 5%;">
      <!-- <router-link :to="{name:'caption'}"> -->
      <router-link :to="{path:'/train/satellite/caption'}">
        <div style="width: 50%;float: left;"><img src="@/assets/btnCaption.png" /></div>
      </router-link>
      <router-link :to="{name:'SatelliteExploration'}">
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
  .cover {
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url(../../../assets/satellite/cover.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* background-position: center; */
    -moz-background-size: 100% 100%;
  }

  /* .cover img{
    position: absolute;
    display: inline-block;
    bottom: 10%;
  } */
</style>
