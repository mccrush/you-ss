<template>
  <div class="container shadow-sm rounded-3 bg-white container-800 p-3">
    <div class="row">
      <div class="col-12">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Вставьте ссылку на Ютуб ролик"
            aria-describedby="button-addon2"
            v-model="link"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            @click="getCaption"
          >
            Получить субтитры
          </button>
        </div>
      </div>
    </div>
    <div v-if="videoId" class="row">
      <div class="col-12 text-start p-3 pb-0">Video ID: {{ videoId }}</div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import HelloWorld from './components/HelloWorld.vue'
//import youtubedl  from 'youtube-dl-exec'
import { getSubtitles } from 'youtube-captions-scraper'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      link: 'https://www.youtube.com/watch?v=CWu29PRCUvQ',
      videoId: '',
      captions: ''
    }
  },
  methods: {
    getCaption() {
      console.log('getCaption(): link:', this.link)
      this.videoId = this.getVideoId(this.link)
      console.log('getVideoId(): this.videoId:', this.videoId)

      getSubtitles({
        videoID: this.videoId, // youtube video id
        lang: 'en' // default: `en`
      }).then(captions => {
        console.log(captions)
      })
    },
    getVideoId(link) {
      let startPoint = ''
      let endPoint = ''
      if (link.indexOf('.com') != -1) {
        startPoint = link.indexOf('v=') + 2
        endPoint = link.length
      } else if (link.indexOf('.be')) {
        console.log('getVideoId(): link.indexOf(.be):', link.indexOf('.be'))
        startPoint = link.indexOf('.be/') + 4
        if (link.indexOf('?t')) {
          endPoint = link.indexOf('?t')
        }
      }
      console.log('getVideoId(): startPoint:', startPoint)
      return link.slice(startPoint, endPoint)
    }
  },
  mounted() {
    // const youtubedl = require('youtube-dl-exec')
    // const url1 = 'http://www.youtube.com/watch?v=WKsjaOqDXgg'
    // const url2 = 'https://vimeo.com/6586873'
    // youtubedl(url1, {
    //   dumpSingleJson: true,
    //   noWarnings: true,
    //   noCallHome: true,
    //   noCheckCertificate: true,
    //   preferFreeFormats: true,
    //   youtubeSkipDashManifest: true,
    //   referer: url1
    // }).then(output => console.log(output))
  }
}
</script>

<style>
body {
  background: #f1f3f4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container-800 {
  max-width: 800px;
}

.btn:focus,
.btn-close:focus,
.btn-check:focus + .btn-outline-dark,
.form-control:focus,
.form-select:focus,
.accordion-button:focus,
.navbar-toggler:focus {
  outline: 0 !important;
  box-shadow: none !important;
}

.form-check-input:focus {
  border-color: rgba(0, 0, 0, 0.25);
  outline: 0;
  box-shadow: none;
}
</style>
