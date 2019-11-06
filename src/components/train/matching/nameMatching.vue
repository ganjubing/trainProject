<template>
  <div class="matching">
    <span class="surplusTime">{{surplusTime}}</span>
    <div v-if="ready">
      <img src="@/assets/matching/personInfo.png" style="width: 100%;height: 100%;" />
      <div style="width: 20.5%;height: 20%;position: absolute;top:39.5%;left: 41.5%;">
        <div style="width: 50%;float: left;height: 100%;position: relative;">
          <img src="@/assets/matching/images/wuyanzu.jpg" style="width: 60%;height: 60%;position: absolute;top:50%;left: 50%;margin-left: -30%;margin-top: -30%;border-radius:10px;" />
        </div>
        <div style="width: 50%;float: left;height: 100%;">
          <span style="font-size: 30px;color: white;text-align:center;display:block;position: relative;top:50%;transform:translateY(-50%);">吴彦祖</span>
        </div>
      </div>
      <img src='@/assets/btnContinu.png' style="position: absolute;left: 45%;bottom: 20%;" />
    </div>
    <div style="border: 1px solid #00FF00; width: 73%;height:68.5%;position: absolute;left: 14.4%;top:14%;">
      <div class="divItem" v-for="item in 32" style="">

      </div>
    </div>
  </div>
</template>

<script>
  import {userList} from '@/data/matching_users.js'
  import {
    randonArr,
    randomLimit,
    getRandomArr,
    randomNumBoth,
  } from '@/utils/common.js'
  export default {
    data() {
      return {
        surplusTime: 299,
        ready: false,
        users:[],
        currentIndex:0,
        currentPerson:[],
      }
    },
    mounted() {
      this.users=userList();
      console.log(this.users)
    },
    methods:{
      getCurrentPerson(isFirst){
        this.currentPerson.push(this.users[this.currentIndex]);
        if(isFirst){
          this.currentPerson.push(this.users[this.currentIndex+1]);
        }
      },
    },
  }
</script>

<style scoped="scoped">
  .matching {
    width: 100%;
    height: 100vh;
    position: relative;
    background-image: url(../../../assets/matching/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }

  .matching .surplusTime {
    position: absolute;
    right: 18%;
    top: 1%;
    font-weight: bolder;
    font-size: 30px;
    color: white;
  }

  .divItem {
    border: #00A000 1px solid;
    margin: 2.5% 0 0 3.2%;
    float: left;
    height: 18.5%;
    width: 9%;
    background-image: url(../../../assets/matching/person.png);
    background-repeat: no-repeat;
    background-size:100% 100%;
  }
</style>
