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
    <div v-if="captions.length" class="row">
      <div class="col-12 text-start p-3 pb-0">
        <input
          type="text"
          class="form-control"
          placeholder="Что ищем?"
          v-model="searchText"
        />
      </div>
    </div>
    <div v-if="searchResult" class="row">
      <div
        v-for="(item, index) in searchResult"
        :key="index + 'st'"
        class="col-12 text-start p-3 pb-0"
      >
        [ {{ item.start }} ]: {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
//import { getSubtitles } from 'youtube-captions-scraper'

export default {
  name: 'App',
  data() {
    return {
      link: 'https://www.youtube.com/watch?v=D8zhRJ61BRU',
      videoId: '',
      captions: [],
      searchText: ''
    }
  },
  computed: {
    searchResult() {
      return (
        this.captions.filter(item =>
          item.text.toUpperCase().includes(this.searchText.toUpperCase())
        ) || []
      )
    }
  },
  methods: {
    async getCaption() {
      //console.log('getCaption(): link:', this.link)
      //this.videoId = this.getVideoId(this.link)
      //console.log('getVideoId(): videoId:', this.videoId)

      const urlSubXML =
        'https://www.youtube.com/api/timedtext?v=D8zhRJ61BRU&asr_langs=de,en,es,fr,id,it,ja,ko,nl,pt,ru,tr,vi&caps=asr&exp=xftt,xctw&xoaf=5&hl=ru&ip=0.0.0.0&ipbits=0&expire=1644429463&sparams=ip,ipbits,expire,v,asr_langs,caps,exp,xoaf&signature=A6D393DC787756747F542764634EA56588DA58FD.AE7EE2A11483E464615E95DBA39560CB41D18517&key=yt8&lang=en'
      // const url =
      //   'http://www.youtube.com/api/timedtext?type=track=1&name=English v0.1&lang=en&v=CWu29PRCUvQ'
      // const urlVid =
      //   'http://www.youtube.com/get_video_ info?video_id=CWu29PRCUvQ'
      try {
        const res = await fetch(urlSubXML)

        const subs = await res.text()
        const ready = new window.DOMParser().parseFromString(subs, 'text/xml')

        //console.log('subs: ', ready)
        const childNodes =
          ready.getElementsByTagName('transcript')[0].childNodes

        //console.log('timeStart: ', childNodes)

        for (let i = 0; i < childNodes.length; i++) {
          //console.log('timeStart: ', childNodes[i].attributes[0].value)
          //console.log('child: ', childNodes[i].innerHTML)
          this.captions.push({
            start: childNodes[i].attributes[0].value,
            text: childNodes[i].innerHTML
          })
        }

        //console.log('this.captions: ', this.captions)
      } catch (error) {
        console.error('error: ', error)
      }
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
