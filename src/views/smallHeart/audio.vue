<template>
  <div>
    <audio class="audio" :src="lists[music]" autoplay v-if="music=='flow'"></audio>
    <audio class="audio" :src="lists[music]" autoplay loop v-else></audio>
  </div>
</template>

<script>
export default {
  // props: ['music'],
  data() {
    return {
      audio: null,
      auto: '',
      music: '',
      refreshTime: 0,
      lists: {
        'refresh': require('../../../static/bgmusic/refresh.mp3'),
        'prelude': require('../../../static/bgmusic/prelude.mp3'),
        'flow': require('../../../static/bgmusic/flow.mp3')
        // 'stop': require('../../../static/bgmusic/prelude.mp3')
      }
    }
  },
  watch: {
    music(n, o) {
      this.audio = this.audio || (this.audio = window.document.querySelector('.audio'))
      if (n === 'stop') {
        this.audio.pause()
        return
      }
      this.audio.play()
    }
  },
  mounted() {
    this.audio = this.audio || (this.audio = window.document.querySelector('.audio'))
    this.audio.play()
    document.addEventListener('WeixinJSBridgeReady', () => {
      this.audio.play()
    }, false)
  }
}
</script>

<style lang="less">
  .audio{
    height:0;
    width:0;
    opacity: 0;
  }
</style>

