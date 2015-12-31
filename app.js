$(function () {
  var getVideo = function(url) {
    $.getJSON(url, function(json) {
      var videoID  = json['detail']['informations']['idVideoPub'];
      var videoURL = json['detail']['informations']['videoURLs'][0]['videoURL'];
      var secret = "?secret=pqzerjlsmdkjfoiuerhsdlfknaes";
      $('#'+ videoID).append('<div class="play" data-video-url="'+ videoURL +'">PLAY</div>')
    });
  };

  var getSerie = function(url) {
    $.getJSON(url, function(json) {
       json['strates'].forEach(function (elem) {
         if (elem['type'] == 'contentGrid') {
           elem['contents'].forEach(function (episode) {
             var mediaImage = episode['URLImage'];
             var mediaURL = episode['onClick']['URLMedias'].replace(/{FORMAT}/, 'mp4');
             var contentId = episode['contentID'];
             var videoTitle = episode['title'];
             var videoSubtitle = episode['subtitle'];

             $('.users-list').append('<li data-video-id="'+ contentId +'" class="play" data-video-url="'+ mediaURL +'"><img src="'+ mediaImage +'" alt="videoTitle" style="border-radius: 0;"><a class="users-list-name" href="#">'+ videoTitle +'</a><span class="users-list-date">'+ videoSubtitle +'</span></li>');
           });
         } else if (elem['type'] == 'carrousel') {
           var image = elem['contents'][0]['URLImage'];
           $('.widget-user-header')
            .css("background", "url("+ image +")")
            .css("background-size", "cover");
         }
      });
    });
  }

  var getEmission = function(url) {
    $.getJSON(url, function(json) {
      json['contents'].forEach(function (episode) {
        var mediaURL   = episode['onClick']['URLMedias'].replace(/{FORMAT}/, 'mp4');
        var contentId  = episode['contentID'];
        var videoTitle = episode['title'];
        var videoSubtitle   = episode['subtitle'];
        var mediaImage = episode['URLImage'];
        $('.users-list').append('<li data-video-id="'+ contentId +'" class="play" data-video-url="'+ mediaURL +'"><img src="'+ mediaImage +'" alt="videoTitle" style="border-radius: 0;"><a class="users-list-name" href="#">'+ videoTitle +'</a><span class="users-list-date">'+ videoSubtitle +'</span></li>');
        getVideo(mediaURL);
      });
    });
  };

  $('.users-list').on('click', '.play', function(e) {
    var videoURL = $(this).data('video-url');
    var videoID  = $(this).data('video-id');
    var $this = $(this);
    $.getJSON(videoURL, function(json) {
      var videoID  = json['detail']['informations']['idVideoPub'];
      var videoURL = json['detail']['informations']['videoURLs'][0]['videoURL'];
      var secret = "?secret=pqzerjlsmdkjfoiuerhsdlfknaes";
      $this.find('img').replaceWith('<video width="320" height="240" controls><source src="'+ videoURL + secret +'" type="video/mp4">Your browser does not support the video tag.</video>');
      $('#'+ videoID).append('<div class="play" data-video-url="'+ videoURL +'">PLAY</div>')
    });
    // console.log('play', $(this).find('img'));
    // $(this).find('img').replaceWith('<video width="320" height="240" controls><source src="'+ videoURL +'" type="video/mp4">Your browser does not support the video tag.</video>');
  });

  $('#catherine').on('click', function(e) {
    e.preventDefault();
    if ($(this).closest('li').hasClass('active')) {
      return ;
    }
    $('.users-list').empty();
    getSerie('http://service.mycanal.fr/page/f03637c515e042aae5f75812fac4040f/1354.json?cache=300000&nbContent=96');
    $('.sidebar-menu li.active').removeClass('active');
    $(this).closest('li').addClass('active');
  });

  $('#bloque').on('click', function(e) {
    e.preventDefault();
    if ($(this).closest('li').hasClass('active')) {
      return ;
    }
    $('.users-list').empty();
    getSerie('http://service.mycanal.fr/page/f03637c515e042aae5f75812fac4040f/4024.json?cache=300000&nbContent=96');
    $('.sidebar-menu li.active').removeClass('active');
    $(this).closest('li').addClass('active');
  });

  $('#petit').on('click', function(e) {
    e.preventDefault();
    if ($(this).closest('li').hasClass('active')) {
      return ;
    }
    $('.users-list').empty();
    getEmission('http://service.mycanal.fr/page/f03637c515e042aae5f75812fac4040f/1352.json?cache=300000&nbContent=96');
    $('.sidebar-menu li.active').removeClass('active');
    $(this).closest('li').addClass('active');
  })
})
