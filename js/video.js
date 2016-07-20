$(document).ready(function() {




    var video = document.getElementById("video");
    var progress = document.getElementById("progress-bar");
    var $buffer = $("#buffer-bar");
    var $play_pause = $("#play-pause");
    var $play_img = $(".play-pause");
    var current_time = document.getElementById("current-time");
    var duration = document.getElementById("duration");
    var $speed = $("#playback-speed");
    var $cc = $("#closed-caption");
    var $mute = $("#mute");
    var $mute_img = $('.mute');
    var $volume_bar = $("#volume-bar");
    var $full_screen = $("#full-screen");
    var textTranscript = document.getElementById("text-transcript");

    /////// utilitie variables \\\\\\\\


    var floor = Math.floor(video.duration);


    //JSON for cue start/end times & text
    var syncData = [
        { "start": "0.01", "end": "7.535", "text": "Now that we've looked at the architecture of the internet, let's see how you might connect your personal devices to the internet inside your house." },
        { "start": "7.536", "end": "13.960", "text": "Well there are many ways to connect to the internet, and most often people connect wirelessly." },
        { "start": "13.961", "end": "17.940", "text": "Let's look at an example of how you can connect to the internet." },
        { "start": "17.941", "end": "30.920", "text": "If you live in a city or a town, you probably have a coaxial cable for cable Internet, or a phone line if you have DSL, running to the outside of your house, that connects you to the Internet Service Provider, or ISP." },
        { "start": "32.100", "end": "41.190", "text": "If you live far out in the country, you'll more likely have a dish outside your house, connecting you wirelessly to your closest ISP, or you might also use the telephone system." },
        { "start": "42.350", "end": "53.760", "text": "Whether a wire comes straight from the ISP hookup outside your house, or it travels over radio waves from your roof, the first stop a wire will make once inside your house, is at your modem." },
        { "start": "53.761", "end": "57.780", "text": "A modem is what connects the internet to your network at home." },
        { "start": "57.781", "end": "59.000", "text": "A few common residential modems are DSL or..." }
    ];

    //Call function to create transcript on page 
    createTranscript();

    //////// FUNCTIONS \\\\\\\

    //Creates the transcript content on the page using JSON
    function createTranscript() {
        var element;
        for (var i = 0; i < syncData.length; i++) {
            element = document.createElement('span');
            element.cue = syncData[i];
            element.innerText = syncData[i].text + " ";
            textTranscript.appendChild(element);
        }
    }

    // format time Function \\

    function formatTime(seconds) {
        seconds = Math.round(seconds);
        minutes = Math.floor(seconds / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }


    //Reset Video Start Time to start time from matching text & play video
    function textJump(e) {
        video.currentTime = e.target.cue.start;
        video.play();
    }

    var sentences = textTranscript.getElementsByTagName('span');
    for (var i = 0; i < sentences.length; i++) {
        sentences[i].addEventListener("click", textJump); //Call textJump function
    }

    //Event listener for text transcript highlight changes
    video.addEventListener("timeupdate", function(e) {
        syncData.forEach(function(element, index, array) {
            if (video.currentTime >= element.start && video.currentTime <= element.end)
                textTranscript.children[index].classList.remove("inactive");
            textTranscript.children[index].classList.add("active");
            if (video.currentTime < element.start || video.currentTime > element.end) {
                textTranscript.children[index].classList.remove("active");
                textTranscript.children[index].classList.add("inactive");
            }
        });
    });









    // play/pause click event \\

    $play_pause.click(function() {
        if (video.paused) {
            video.play();
            $play_img.attr('src', 'icons/pause-icon.png');
        } else {
            video.pause();
            $play_img.attr('src', 'icons/play-icon.png');
        }
    });









    //////////// Progress & Buffer Bars + Time Display \\\\\\\\\\\\\

    video.addEventListener('loadedmetadata', function() {
        progress.setAttribute('max', floor);

    });

    video.addEventListener('timeupdate', function() {
        progress.value = video.currentTime;

        current_time.innerHTML = formatTime(video.currentTime);
        duration.innerHTML = formatTime(video.duration);

        var buffer_value = (100 / video.duration) * video.buffered.end(0);
        $buffer.val(buffer_value);

        // when video is finished it resets
        if (video.currentTime == video.duration) {
            video.pause();
            video.currentTime = 0;
            $play_img.attr('src', 'icons/play-icon.png');
        }
    });

    // skiping \\

    var videoSeek = function(clickValue) {
        video.currentTime = clickValue / 100 * video.duration;
        if (video.paused) {
            video.play();

        }
    };
    
    progress.addEventListener('click', function(e) {
        var clickValue = Math.round(e.offsetX / this.offsetWidth * 100);
        videoSeek(clickValue);
    });













    /////////// Full Screen click event \\\\\\\\\\

    $full_screen.click(function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
        }

    });

    /////////// Caption button click event \\\\\\\\\\
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









});
