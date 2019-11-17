<template>
  <div class="divisionCover">
    <div style="width: 50%;position: absolute ;left:25%;bottom: 5%;">
      <!-- <router-link :to="{name:'caption'}"> -->
      <router-link :to="{name:'DivisionCaption'}">
        <div style="width: 50%;float: left;"><img src="@/assets/btnCaption.png" /></div>
      </router-link>
      <router-link :to="{name:'DivisionStorm'}">
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
  .divisionCover {
    width: 100%;
    height: 100vh;
    background-image: url(../../../assets/division/cover.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* background-position: center; */
    -moz-background-size: 100% 100%;
  }
</style>
