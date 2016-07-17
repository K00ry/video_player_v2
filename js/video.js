$(document).ready(function() {




    var video = document.getElementById("video");
    var progress = document.getElementById("progress-bar");
    var bar = document.getElementById("bar");
    var $buffer = $("#buffer-bar");
    var v_controls = document.getElementById("video-controls");
    var left_controls = document.getElementById("left-controls");
    var $play_pause = $("#play-pause");
    var $play_img = $(".play-pause");
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


    /////// utilities variables \\\\\\\\


    var floor = Math.floor(video.duration);






    $play_pause.click(function() {
        if (video.paused) {
            video.play();
            $play_img.attr('src', 'icons/pause-icon.png');
        } else {
            video.pause();
            $play_img.attr('src', 'icons/play-icon.png');
        }
    });


        

    // format time Function \\

    function formatTime(seconds) {
        seconds = Math.round(seconds);
        minutes = Math.floor(seconds / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }

    


    //////////// Progress Bars \\\\\\\\\\\\\

    video.addEventListener('loadedmetadata', function() {
        progress.setAttribute('max', video.duration);
    });

    video.addEventListener('timeupdate', function() {
        progress.value = video.currentTime;
        bar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
        current_time.innerHTML =formatTime(video.currentTime);

        var buffer_value = (100 / video.duration) * video.buffered.end(0);
        $buffer.val(buffer_value);
    });

    // skiping \\

    progress.addEventListener('click', function(e) {
        var pos = (e.pageX - this.offsetLeft) / this.offsetWidth;
        video.currentTime = pos * video.duration;
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



var jasem = video.buffered.length;

	console.log(jasem);





});
