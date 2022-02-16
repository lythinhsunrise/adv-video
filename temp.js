const script = document.createElement("script")
script.src = "/video.js/dist/video.js"
script.addEventListener("load", () => {

})
window.parent.document.getElementsByTagName("head")[0].append(script)

//
// playerima.js
//
// VideoJS
var adv = window.parent.document.getElementById('adv')
var videoOptions = {
  controls: true,
  width: 640,
  height: 320,
  sources: [{
    src: 'https://cdn-player.urekamedia.com/hls/vietnamtravel/vietnam-travela.m3u8',
    type: 'application/x-mpegURL',
  }],
}

var player = videojs(adv, videoOptions)

// IMA ads video
var options = {
  adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?' +
    'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
    'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
    'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator='
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
var $videoWrap = window.parent.document.getElementById('wrap-adv')
var $video = window.parent.document.getElementById('adv')
var videoHeight = $video.offsetHeight
// var videoBottom = videoHeight + $videoWrap.offsetTop
// var halfVideoWrap = $videoWrap.offsetTop / 2
var videoBottom = 800 + ($videoWrap.offsetTop-160)
var halfVideoWrap = $videoWrap.offsetTop - 160
var firstPlay = true

$window.addEventListener("scroll", function () {
  var windowScrollTop = $window.scrollY
  // console.log(windowScrollTop)
  // console.log(videoBottom)
  if (windowScrollTop > halfVideoWrap && firstPlay) {
    player.play()
    firstPlay = false
  }
  if (windowScrollTop > videoBottom) {
    $video.classList.add('stuck')
  } else {
    $video.classList.remove('stuck')
  }
})

//Insert file CSS
filecss = [
  '/video.js/dist/video-js.css',
  '/videojs-ima/dist/videojs.ima.css',
  '/videojs-contrib-ads/dist/videojs-contrib-ads.css',
  '/videoSticky.css'
]
const importCSS = function(array) {
  array.forEach(element => {
    var link = document.createElement("link");
    link.href = element
    link.rel = 'stylesheet'
    window.parent.document.getElementsByTagName("head")[0].append(link)
  });
}
importCSS(filecss)
