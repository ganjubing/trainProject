<template>
  <div class="cover">
    <div style="width: 50%;position: absolute ;left:25%;bottom: 0%;">
      <router-link to="stroop/caption">
        <div style="width: 50%;float: left;"><img src="../../../assets/btnCaption.png" /></div>
      </router-link>

      <div style="width: 50%;float: left;"><img src="../../../assets/btnStart.png" /></div>
    </div>


  </div>
</template>

<script>
</script>

<style>
  .cover{
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url(../../../assets/stroop/cover.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }
  /* .cover img{
    position: absolute;
    display: inline-block;
    bottom: 10%;
  } */
</style>
