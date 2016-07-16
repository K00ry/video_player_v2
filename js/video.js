$(document).ready(function() {


    var video = document.getElementById("video");
    var progress = document.getElementById("progress-bar");
    var buffer = document.getElementById("buffer-bar");
    var v_controls = document.getElementById("video-controls");
    var left_controls = document.getElementById("left-controls");
    var $play_pause = $("#play-pause");
    var $play_img = $(".play_pause");
    var time_display = document.getElementById("time-display");
    var current_time = document.getElementById("current-time");
    var duration = document.getElementById("duration");
    var right_controls = document.getElementById("right-controls");
    var $speed = $("#playback-speed");
    var $cc = $("#closed-caption");
    var $mute = $("#mute");
    var $mute_img = $('.mute')
    var $volume_bar = $("#volume-bar");
    var $full_screen = $("#full-screen");



 

    $play_pause.click(function() {
        if (video.paused === true) {
            video.play();
            $play_img.attr('src','icons/play-icon.png'); 
        } else {
            video.pause();
            $play_img.attr('src','icons/pause-icon.png');
        }
    });

    $full_screen.click(function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
        }

    });

    // Caption button click event
    $cc.click(function() {
        if (video.textTracks[0].mode == "showing") {
            // Turn off captions
            video.textTracks[0].mode = "hidden";

            // update CC button text 
            $cc.html("<strike>CC</strike>");
        } else {
            // Turn captions on
            video.textTracks[0].mode = "showing";

            // update CC button text 
            $cc.html("CC");

        }
    });

    $volume_bar.change(function() {
        video.volume = $volume_bar.val();
        if (video.volume === 0) {
            $mute_img.attr('src', 'icons/volume-off-icon.png');
        } else {
            $mute_img.attr('src', 'icons/volume-on-icon.png');
        }



    });




    $mute.click(function() {
        if (video.muted) {
            video.muted = false;
            $mute_img.attr('src', 'icons/volume-on-icon.png');

        } else {
            video.muted = true;
            $mute_img.attr('src', 'icons/volume-off-icon.png');

        }
    });

    $speed.click(function() {
        if (video.playbackRate === 1.0) {
            video.playbackRate = 1.5;
            $speed.html("Fast");
        } else if (video.playbackRate === 1.5) {
            video.playbackRate = 2.0;
            $speed.html("Faster");
        } else {
            video.playbackRate = 1.0;
            $speed.html("normal");
        }
    });





    console.log(video.textTracks);



});
