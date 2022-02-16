class Uplayer {
  constructor(config) {
    this.config = config;
  }
  init() {
    //Insert file CSS
    var filecss = [
      '/video.js/dist/video-js.css',
      '/videojs-ima/dist/videojs.ima.css',
      '/videojs-contrib-ads/dist/videojs-contrib-ads.css',
      '/videoSticky.css',
    ]
    const importCSS = function (array) {
      array.forEach(element => {
        var link = document.createElement("link");
        link.href = element
        link.rel = 'stylesheet'
        window.parent.document.getElementsByTagName("head")[0].append(link)
      });
    }
    importCSS(filecss)

    //Video Player
    var container = window.parent.document.querySelector(config.id)
    var adv = container.querySelector('video')
    var videoOptions = {
      controls: true,
      width: 640,
      height: 320,
      sources: [{
        src: this.config.video,
        type: this.config.type,
      }],
    }
    var player = videojs(adv, videoOptions)

    // IMA ads video
    var options = {
      adTagUrl: this.config.vast,
    };

    player.ima(options);
    var adssecond = 0;

    player.on('timeupdate', function () {
      var currentTime = player.currentTime()
      if (Math.round(currentTime) !== adssecond && Math.round(currentTime) !== 0 && Math.round(currentTime) % 10 === 0) {
        player.ima.changeAdTag(options.adTagUrl);
        player.ima.requestAds()
        adssecond = Math.round(currentTime)
      }
    })

    // Sticky video to right screen && Play when scroll to video
    var $window = window.parent
    var $videoWrap = container
    var $video = adv
    var videoHeight = $video.offsetHeight
    // var videoBottom = videoHeight + $videoWrap.offsetTop
    // var halfVideoWrap = $videoWrap.offsetTop / 2
    var videoBottom = 800 + ($videoWrap.offsetTop - 160)
    var halfVideoWrap = $videoWrap.offsetTop - 160
    var firstPlay = true
    var $videodiv = $videoWrap.querySelector('div');

    $window.addEventListener("scroll", function () {
      var windowScrollTop = $window.scrollY
      if (windowScrollTop > halfVideoWrap && firstPlay && config.autoplay) {
        player.play()
        firstPlay = false
      }
      if (config.floating) {
        if (windowScrollTop > videoBottom) {
          $videoWrap.classList.add('stuck')
          $videodiv.classList.remove('adv-dimensions')
        } else {
          $videoWrap.classList.remove('stuck')
          $videodiv.classList.add('adv-dimensions')
        }
      }
    })

  }
}