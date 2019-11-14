<template>
  <div class="ruleCover">
    <div style="width: 50%;position: absolute ;left:25%;bottom: 5%;">
      <!-- <router-link :to="{name:'caption'}"> -->
      <router-link :to="{name:'RuleCaption'}">
        <div style="width: 50%;float: left;"><img src="@/assets/btnCaption.png" /></div>
      </router-link>
      <router-link :to="{name:'RuleClassification'}">
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
  .ruleCover {
    width: 100%;
    height: 100vh;
    background-image: url(../../../assets/classification/cover.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* background-position: center; */
    -moz-background-size: 100% 100%;
  }
</style>
