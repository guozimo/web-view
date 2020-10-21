<template>
  <div class="result">
    <div class="bg-cover"></div>
    <div class="content">
      <div class="result-content">
        <div class="shareTip">
          <div class="top"></div>
        </div>
        <div class="close" @click="closeResult"></div>
        <div class="text">
          <p>本局戳中<span class="yellow">{{count}}</span>次</p>
        </div>
        <div class="title">
          <div class="left">荣获</div>
          <div class="middle">{{titleList[Math.floor(Math.random() *titleList.length)].title}}</div>
          <div class="right">称号</div>
        </div>
        <div class="encourage" v-html="encourage"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: ['count', 'question', 'title'],
    data() {
      return {
        // titleList: [{ title: '玉女无痕手', num: 0 }, { title: '兰花拂穴手', num: 40 }, { title: '隔空点穴手', num: 60 }, { title: '葵花点穴手', num: 100 }]
        titleList: [{ title: '最帅张家乐', num: 20 }, { title: '最美袁度', num: 40 }, { title: '最渣王彬', num: 60 }, { title: '最骚杨招', num: 80 }]
      }
    },
    methods: {
      closeResult() {
        this.$emit('close')
      },
      filterTitle() {
        const idx = this.titleList.findIndex(item => item.title === this.title)
        return this.titleList[idx + 1]
      }
    },
    computed: {
      encourage() {
        if (this.count === 0) {
          return '少年，勤劳致富啊，<br>白给的题都不要么？'
        }
        if (this.question < 5) {
          return '哎呀，时运不济，<br>要不再来一次？'
        }
        if (this.count > 99) {
          return '阁下单身20年的手速<br>实在是佩服佩服'
        }
        if (this.count < 100) {
          const item = this.filterTitle()
          return `厉害了我的哥<br>再戳${item.num - this.count}次就是传说中的<br>${item.title}啦`
        }
      }
    },
    created() {}
  }
</script>

<style lang="less">
.result{
		position: fixed;
	  left: 0;
	  top: 0;
	  bottom: 0;
	  right: 0;
	  z-index: 999;
	  .bg-cover{
	  	background-color: #333;
	  	opacity: 0.75;
	  	position: absolute;
	  	left: 0;
	  	top: 0;
	  	width: 100%;
	  	height: 100%;
    }
    .content{
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
	  	left: 0;
	  	top: 0;
	  	width: 100%;
      height: 100%;
      .result-content{
        position: relative;
        text-align: center;
        width:6.10rem;
        height:8.74rem;
        background:url(../../../static/image/smallHeart/result.png) no-repeat center;
        background-size:100%;
        font-size:.42rem;
        .shareTip{
          position: absolute;
          width:5.72rem;
          height:.94rem;
          top:-1.5rem;
          right:-.4rem;
          .top{
            position: absolute;
            right:1.2rem;
            width:2.66rem;
            height:.54rem;
            background:url(../../../static/image/smallHeart/tip-top.png) no-repeat center;
            background-size:100%;
            animation: tipBlink 2s ease 0s infinite;
          }
          .bottom{
            position: absolute;
            top:.54rem;
            width:5.72rem;
            height:.48rem;
            background:url(../../../static/image/smallHeart/tip-bottom.png) no-repeat center;
            background-size:100%;
            animation: tipBlink 2s ease 0s infinite;
          }
        }
        .close{
          position: absolute;
          width:.78rem;
          height:.74rem;
          right:0;
          top:.16rem;
        }
        .text{
          color:#fff;
          margin-top:1.7rem;
          p{
            height:.8rem;
            line-height: .8rem;
            letter-spacing: .03rem;
            .yellow{
              padding:0 .15rem;
              color:#f5a623;
            }
          }
        }
        .title{
          margin-right:.26rem;
          margin-top:.58rem;
          height:.96rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .left,.right{
            color:#f5a623;
          }
          .middle{
            width:2.6rem;
          }
        }
        .encourage{
          width:4.5rem;
          margin:0 auto;
          margin-top:1.3rem;
          color:#f5a623;
          font-size:.36rem;
        }
      }
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
