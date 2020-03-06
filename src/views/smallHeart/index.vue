<template>
  <div class="container">
    <div class="bg-cover-once" v-if="isFirst&&showCover"></div>
    <div class="bg-cover-once top" v-show="shareTipShow" @click="shareTipShow=false"></div>
    <div class="top-container">
      <div class="store">
        <div class="content">
          <div class="second">
            <img :src="imageMap[second]" alt="" :class="[{'blink':secondBlink},{'ten':second==10},{'one':second==1}]">
          </div>
          <div class="progress"><div class="value" :style="progressWidth"></div></div>
          <img :src="readyPic" alt="" :class="['ready',{'blink':readyBlink}]">
          <img src="../../../static/image/smallHeart/go.png" alt="" :class="['go',{'blink':readyBlink}]">
        </div>
      </div>
    </div>
    <div class="bottom-container">
      <div class="plat" >
        <img src="../../../static/image/smallHeart/file.png" alt="" v-for="i in 7" :key="i" :class="['file',`file-${i}`,{'pop':i<=fileCounts&&count>0},{'show':fileCounts>0&&count==0}]">
        <p class="file-count">手速刷到爆</p>
        <div class="arrow left-arrow"></div>
        <div class="arrow right-arrow"></div>
      </div>
      <div class="button-container">
        <img src="../../../static/image/smallHeart/button.png" alt="" id="button" :class="['button',{'tap-me':buttonAnimation}]" @touchstart="start" @touchend="stop">
        <img src="../../../static/image/smallHeart/hand.png" alt="" :class="['hand',{'tap-me':handAnimation}]" v-if="handShow">
        <div class="words" v-if='startWordsShow' @click="begin">开始</div>
        <div class="tap-count" v-if="second>0&&count!=0">×{{count}}</div>
      </div>
    </div>
    <result v-if="showResult" @close="hideResult" :count="count" :question="question" :title="title"></result>
    <!-- <v-audio :music="music"></v-audio> -->
    <div style="display:none" ref="audioCon"></div>
    <div class="shareTip" v-if="shareTipShow">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Result from './result'
import VAudio from './audio'
import zero from '../../../static/image/smallHeart/0.png'
import one from '../../../static/image/smallHeart/1.png'
import two from '../../../static/image/smallHeart/2.png'
import three from '../../../static/image/smallHeart/3.png'
import four from '../../../static/image/smallHeart/4.png'
import five from '../../../static/image/smallHeart/5.png'
import six from '../../../static/image/smallHeart/6.png'
import seven from '../../../static/image/smallHeart/7.png'
import eight from '../../../static/image/smallHeart/8.png'
import nine from '../../../static/image/smallHeart/9.png'
import ten from '../../../static/image/smallHeart/10.png'
import { getUrlData } from '@/utils/getUrlData'
const VAudioCon = Vue.extend(VAudio)
export default{
  data() {
    return {
      imageMap: [
        zero, one, two, three, four, five, six, seven, eight, nine, ten
      ],
      readyPic: require('../../../static/image/smallHeart/ready.png'),
      headImageUrl: '',
      nickName: '',
      highestApm: 0,
      chance: 0,
      extraChance: 0,
      usersHeadImageUrl: [],
      title: '',
      handShow: true,
      handAnimation: false,
      buttonAnimation: false,
      startWordsShow: true,
      shareForChance: false,
      readyBlink: false,
      second: 10,
      secondBlink: false,
      count: 0,
      fileCounts: 0,
      question: 0,
      showResult: false,
      music: 'prelude',
      showTitle: false,
      isFirst: false,
      showCover: false,
      shareTipShow: false,
      peopleSum: 0,
      helpUsersInfo: [],
      questionObtain: true,
      shareMark: '',
      showAllFiles: true
    }
  },
  components: {
    Result,
    VAudio
  },
  methods: {
    start() {
      if (this.readyBlink || this.second < 1) {
        return
      }
      this.handShow = true
      this.buttonAnimation = true
      this.handAnimation = true
      this.count++
      this.audio.music = 'refresh'
    },
    stop() {
      this.buttonAnimation = false
      this.handAnimation = false
    },
    begin() {
      this.handShow = false
      this.startWordsShow = false
      this.readyBlink = true
      this.fileCounts = 0
      this.showAllFiles = false
      // this.music = 'stop'
      this.showTitle = false
      this.title = ''
      var timer1 = setTimeout(() => {
        clearTimeout(timer1)
        this.readyBlink = false
        this.secondDown()
      }, 1500)
    },
    secondDown() {
      var timer = setInterval(() => {
        if (this.second < 1) {
          clearInterval(timer)
          return false
        }
        this.second--
      }, 1000)
    },
    hideResult() {
      this.showResult = false
      this.showTitle = true
      this.showCover = true
      this.handShow = true
      this.count = 0
      this.second = 10
      this.startWordsShow = true
      this.audio.music = 'prelude'
    },
    reduceChance() {
      if (this.chance > 0) {
        this.chance--
        return
      }
      if (this.extraChance > 0) {
        this.extraChance--
      }
    },
    share() {
      this.shareTipShow = true
    }
  },
  computed: {
    progressWidth() {
      const style = {
        width: this.second * 10 + '%'
      }
      return style
    },
    cutCount() {
      const c = this.count.toString()
      return c.split('')[c.length - 1]
    }
  },
  watch: {
    second(n, v) {
      if (n > 1 && n < 4) {
        this.secondBlink = true
      }
      if (n === 0 && v === 1) {
        this.audio.music = 'flow'
        this.secondBlink = false
        this.showResult = true
      }
    },
    count(n, v) {
      if (!this.questionObtain) {
        return
      }
      switch (n) {
        case 1:
          this.fileCounts = 1
          break
        case 10:
          this.fileCounts = 2
          break
        case 20:
          this.fileCounts = 3
          break
        case 30:
          this.fileCounts = 4
          break
        case 45:
          this.fileCounts = 5
          break
        case 60:
          this.fileCounts = 6
          break
        case 80:
          this.fileCounts = 7
          break
      }
    }
  },
  filters: {
    sumMax(sum) {
      return sum > 9999 ? '9999+' : sum
    }
  },
  created() {
    document.title = '手速刷到爆'
    this.shareMark = getUrlData('shareMark') || ''
    this.handAnimation = true
  },
  mounted() {
    this.audio = window.audiotemp || (window.audiotemp = new VAudioCon({
      data: { music: 'prelude' }
    }))
    console.log(this.$route)
    this.audio.music = 'prelude'
    this.audio.$mount(this.$refs.audioCon)
    window.addEventListener('blur', () => {
      this.audio.music = 'stop'
    })
    window.addEventListener('focus', () => {
      if (this.$route.name === 'SmallHeart') {
        this.audio.music = 'prelude'
      }
    })
  },
  beforeDestroy() {
    this.audio.audio.pause()
  }
}
</script>

<style lang="less" scoped>
.title-common{
  margin:0 auto .6rem;
  height:.5rem;
  line-height: .5rem;
  font-size:.4rem;
  text-align: center;
  background:url(../../../static/image/smallHeart/line.png) repeat-x bottom;
}
  .shareTip{
    position: fixed;
    width:5.72rem;
    height:.94rem;
    top:.5rem;
    right:.2rem;
    z-index: 5;
    .top{
      position: absolute;
      right:.9rem;
      width:2.66rem;
      height:.54rem;
      background:url(../../../static/image/smallHeart/tip-top.png) no-repeat center;
      background-size:100%;
      animation: tipBlink 1.5s ease 0s infinite;
    }
    .bottom{
      position: absolute;
      top:.54rem;
      width:5.72rem;
      height:.48rem;
      background:url(../../../static/image/smallHeart/tip-bottom.png) no-repeat center;
      background-size:100%;
      animation: tipBlink 1.5s ease 0s infinite;
    }
  }
  .container{
    font-size:.26rem;
    .bg-cover-once{
	  	background-color: #333;
	  	opacity: 0.75;
	  	position: fixed;
	  	left: 0;
	  	top: 0;
	  	width: 100%;
      height: 100%;
      z-index:2;
      &.top{
        z-index:4;
      }
    }
    .top-container{
      height:6.9rem;
      width:100%;
      background:url(../../../static/image/smallHeart/bg-top.png) no-repeat center;
      background-size:100%;
      position: relative;
      .user-info{
        padding-top:.38rem;
        padding-left:.22rem;
        display: flex;
        justify-content: space-around;
        color:#fff;
        .icon{
          height:1.56rem;
          width:1.44rem;
          background:url(../../../static/image/smallHeart/border.png) no-repeat center;
          background-size:100%;
          img{
            margin-left:.13rem;
            margin-top:.13rem;
            width:1.18rem;
            height:1.21rem;
          }
          .title{
            width:1.6rem;
            height:.5rem;
            text-align: center;
            background: #fff;
            border:.05rem solid #a21e2e;
            color:#a21e2e;
            font-size:.3rem;
            font-weight: bold;
            transform:rotate(-20deg) translate(.1rem,-.3rem);
            animation: scales .5s;
          }
        }
        .times{
          width:2.24rem;
          padding-top:.7rem;
          p{
            height:.44rem;
          }
          .heart{
            width:.26rem;
            height:.22rem;
            display: inline-block;
            background: url(../../../static/image/smallHeart/heart.png) no-repeat center;
            background-size:100%;
            margin-right:.15rem;
          }
          .red{
            color:#d7263c;
          }
          .blink{
            animation: secondBlink 1s ease 2;
          }
        }
        .info{
          flex-grow:1;
          padding:.7rem 0 0 .32rem;
          text-align: left;
          p{
            height:.44rem;
            line-height: .44rem;
            overflow:hidden;
          }
        }
      }
      .store{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom:.5rem;
        width:100%;
        height:4rem;
        .content{
          position: relative;
          display: flex;
          justify-content: center;
          width:5.24rem;
          height:4rem;
          background:url(../../../static/image/smallHeart/store.png) no-repeat center;
          background-size: 100%;
          position: relative;
          .second{
            position: relative;
            margin-top:.68rem;
            height:.56rem;
            width:2.76rem;
            font-size: .5rem;
            color:#fff;
            background:url(../../../static/image/smallHeart/second-bg.png) no-repeat center;
            background-size:100%;
            img{
              position: absolute;
              top:-.2rem;
              left:50%;
              transform: translate(-40%);
              width:.64rem;
              height:.54rem;
              &.ten{
                width:1.06rem;
              }
              &.one{
                width:.32rem;
              }
              &.blink{
                animation: secondBlink 1s ease 0s 3;
              }
            }
          }
          .progress{
            position: absolute;
            height:.12rem;
            width:2.76rem;
            top:1.4rem;
            left:1.25rem;
            background:#fff;
            .value{
              height:.12rem;
              background:#D0021B;
            }
          }
          .people{
            position: absolute;
            left:.27rem;
            bottom:.18rem;
            width:4.7rem;
            height:.56rem;
            background: url(../../../static/image/smallHeart/rank.png) no-repeat left,url(../../../static/image/smallHeart/rank-arrow.png) no-repeat right;
            background-size:.84rem .26rem, .2rem .32rem;
            .icon-box{
              position: absolute;
              width:3.5rem;
              left:1rem;
              vertical-align: top;
              .icon{
                display: inline-block;
                margin-right:.07rem;
                margin-top: .05rem;
              }
              .num{
                width:1.7rem;
                height: .5rem;
                line-height: .5rem;
                margin-top:.05rem;
                float:right;
                color:#f1e221
              }
            }
          }
          .ready{
            position: absolute;
            top:1.5rem;
            opacity: 0;
            width:4.94rem;
            height:1.18rem;
            &.blink{
              animation: flyFromRight .5s ease 0s;
            }
          }
          .go{
            position: absolute;
            top:1.5rem;
            opacity: 0;
            width:2.56rem;
            height:1.22rem;
            &.blink{
              animation: flyFromLeft .5s ease 1s;
            }
          }
        }
      }
    }
    .bottom-container{
      background:url(../../../static/image/smallHeart/bg-bottom.png) repeat-y center;
      background-size:100%;
      width:100%;
      min-height:12.74rem;
      height:100%;
      .plat{
        position: relative;
        height:1.38rem;
        width:3.82rem;
        margin:0 auto;
        background:url(../../../static/image/smallHeart/plat.png) no-repeat center bottom;
        background-size:100%;
        z-index:3;
        .file{
          position: absolute;
          top:0rem;
          width:2.08rem;
          height:.62rem;
          opacity: 0;
          transform: scale(.8);
          &.pop{
            opacity: 1;
            animation: popFile 1s ease 0s;
          }
          &.show{
            opacity: 1;
          }
          &.file-1{
            top:.3rem;
            left:0rem;
          }
          &.file-2{
            top:.3rem;
            left:1.6rem;
          }
          &.file-3{
            top:.2rem;
            left:-.2rem;
          }
          &.file-4{
            top:.3rem;
            left:.9rem;
          }
          &.file-5{
            top:.2rem;
            left:2.1rem;
          }
          &.file-6{
            top:.1rem;
            left:.2rem;
          }
          &.file-7{
            top:.1rem;
            left:1.5rem;
          }
        }
        .file-count{
          position: absolute;
          left:35%;
          top:.95rem;
          color:#d0df10;
        }
        .go-library{
          position: absolute;
          right:.2rem;
          top:.95rem;
          color:#d0df10;
        }
        .arrow{
          position:absolute;
          height:.54rem;
          width:.28rem;
          top:.54rem;
          &.left-arrow{
            left:-1rem;
            background: url(../../../static/image/smallHeart/left-arrow.png) no-repeat center;
            background-size:100%;
            animation: leftMove .5s ease 0s infinite;
          }
          &.right-arrow{
            right:-1rem;
            background: url(../../../static/image/smallHeart/right-arrow.png) no-repeat center;
            background-size:100%;
            animation: rightMove .5s ease 0s infinite;
          }
        }
      }
      .button-container{
        height:2.5rem;
        width:3.32rem;
        margin:0 auto;
        position: relative;
        .hand{
          width:1.32rem;
          height:1.02rem;
          position: absolute;
          left:0;
          bottom:.3rem;
          &.tap-me{
            animation: tapHand .2s ease infinite;
          }
        }
        .button{
          width:2.08rem;
          height:1.92rem;
          position: absolute;
          bottom:0;
          left:50%;
          transform: translateX(-50%);
          touch-action: none;
          &.tap-me{
            animation: tapButton .2s;
          }
        }
        .words{
          width:2.08rem;
          height:1.92rem;
          line-height: 1.45rem;
          position: absolute;
          bottom:0rem;
          text-align: center;
          left:50%;
          transform: translateX(-50%);
          color:#fff;
          font-size: .5rem;
          .text{
            position: absolute;
            top:.3rem;
            left:.29rem;
            width:1.5rem;
            height:.4rem;
            line-height: .4rem;
            font-size: .3rem;
          }
        }
        .tap-count{
          position: absolute;
          left:-1rem;
          height:1.2rem;
          width:1.2rem;
          color:#D0021B;
          font-size: 1rem;
        }
      }
      .help{
        width:100%;
        margin:.8rem 0 0;
        .title{
          color:#926030;
          width:3rem;
          .title-common;
        }
      }
      .rules{
        width:80%;
        margin:.8rem auto .3rem auto;;
        color:#926030;
        font-size:.32rem;
        .title{
          width:2.2rem;
          .title-common;
        }
      }
    }
  }
  @keyframes tapHand {
      from{
        bottom:.3rem;
      }
      to{
        bottom:0rem;
      }
  }
  @keyframes tapButton {
    from{
      bottom:0rem;
    }
    to{
      bottom:-.3rem;
    }
  }
  @keyframes flyFromLeft {
    from{
      left:-100%;
      opacity: 0;
    }
    to{
      left:50%;
      transform: translateX(-50%);
      opacity: 1;
    }
  }
  @keyframes flyFromRight {
    from{
      left:100%;
      opacity: 0;
    }
    to{
      left:50%;
      transform: translateX(-50%);
      opacity: 1;
    }
  }
  @keyframes secondBlink {
    from{
      opacity: 1;
    }
    to{
      opacity: 0;
    }
  }
  @keyframes popFile {
    0%{
      top:-1.6rem;
      left:.85rem;
      opacity: 1;
      transform: scale(.8)
    }
    50%{
      top:1rem;
      left:.85rem;
      opacity: .3;
      transform: scale(3)
    }
    100%{
      top:.3rem;
      left:.85rem;
      opacity: 1;
      transform: scale(.8);
    }
  }
  @keyframes leftMove {
    from{
      left:-1rem;
    }
    to{
      left:-.4rem
    }
  }
  @keyframes rightMove {
    from{
      right:-1rem;
    }
    to{
      right:-.4rem
    }
  }
  @keyframes scales {
    from{
      transform: scale(3) rotate(-20deg) translate(.1rem,-.3rem);
    }
    to{
      transform: scale(1) rotate(-20deg) translate(.1rem,-.3rem);
    }
  }
  @keyframes tipBlink {
    0%{
      opacity: 1;
    }
    80%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
</style>

