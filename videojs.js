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
  var player = videojs(adv, videoOptions, function onPlayerReady() {
    videojs.log('Your player is ready!');
  
    // In this context, `this` is the player that was created by Video.js.
    // this.play();
  
    // How about an event listener?
    this.on('ended', function() {
      videojs.log('Awww...over so soon?!');
    });
  });
  player.play()