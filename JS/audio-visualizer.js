var canvas, canvasCtx, source, context, analyser, frequencyArray, rads,
	center_x, center_y, radius, bgBar_Count, bar_x_term, bar_y_term, bar_width,
	bar_height, react_x, react_y, curFrequency, rotations, inputURL, shapeRotation,
	trackName, audio, toggle_Play, artist, title, img_url, logoImg, mouseOver;

var client_id = "8df0d68fcc1920c92fc389b89e7ce20f";

// init variables
bgBar_Count = 200;
shapeRotation = 0;
react_x = 0;
react_y = 0;
radius = 0;
rotations = 0;
curFrequency = 0;
toggle_Play = false;
mouseOver = false;
rotateNeg = true;

function initCanvas_Audio() {
	// Modal pop-up tutorial
	$('#myModal').modal('show');

	canvas = $("#visualizer_render")[0];
	canvasCtx = canvas.getContext("2d");
	refresh_canvasSize();

	logoImg = $("#logo")[0];

	audio = new Audio();
	audio.crossOrigin = "anonymous";
	audio.controls = true;
	audio.loop = false;
	audio.autoplay = false;
	// Audio Context to convert frequency to array of numbers
	context = new AudioContext();
	analyser = context.createAnalyser();
	source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(context.destination);
  	frequencyArray = new Uint8Array(analyser.frequencyBinCount);
  	canvasUpdater();
}

function textboxAuto_Highlight() {
	$("#input_URL").select();
}

function refresh_canvasSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function handlePlay_Button() {
    let userURL = $("#user_URL").val();
    // Check for invalid url
    if(userURL.search("soundcloud.com") == -1 || userURL.search("api.soundcloud.com") != -1){
        return;
    }
    let strippedURL = userURL.replace(/http:\/\/|https:\/\//, "").split("/");
    // Check for user and song
    if(strippedURL.length == 3) {
        let soundCloudUserURL = "http://" + strippedURL[0] + "/" + strippedURL[1];
        trackName = strippedURL[2];
        let apiURL = "https://api.soundcloud.com/resolve.json?url=" + soundCloudUserURL + "&client_id=" + client_id;
        getUser_Info(apiURL);
    }
}

function getUser_Info(url) {
	$.getJSON(url, function(user) {
		let user_id = user.id;
		artist = user.username;
		let tracks = "https://api.soundcloud.com/users/" + user_id + "/tracks.json?client_id=" + client_id + "&limit=200";
		getTrack_Info(tracks);
	});
}

function getTrack_Info(url) {
	$.getJSON(url, function(tracks) {
		$(tracks).each(function(index) {
			track = tracks[index];
    		if(track.permalink == trackName) {
				inputURL = track.stream_url + "?client_id=" + client_id;
				title = track.title;
				img_url = track.artwork_url;
				playAudio();
				return false;//To break out of each loop
			}
		});
	});
}

function togglePlay() {
	if(toggle_Play) {
		toggle_Play = false;
		$("#toggle").html("&#x23f5;");
		audio.pause();
	} else {
		toggle_Play = true;
		$("#toggle").html("&#10074;&#10074;");
		audio.play();
	}
}
			
function playAudio() {
	context.resume()
	
	audio.src = inputURL;
	
	toggle_Play = true;
	document.getElementById("toggle").innerHTML = "&#10074;&#10074;";
	audio.play();
	
	$("#artistname").html(artist);
	$("#songname").html(title);
	$("#pagetitle").html(title + " by " + artist);
	$("#artwork").attr("src", img_url);
	// JS styling to prevent border form appearing before image does
	$("#artwork").css("opacity", "100");
}

function sliderTime() {
	audio.currentTime = $('#audioSlider').val() * (audio.duration * .01);
}
			
function canvasUpdater() {
	window.requestAnimationFrame(canvasUpdater);
	refresh_canvasSize();

	// Update audio timer and slider
	// Slider
	if(!mouseOver) $("#audioSlider").val((100 / audio.duration) * audio.currentTime);
	// Timer
	let minute = Math.floor(audio.currentTime / 60),
	tenthsSec = Math.floor(audio.currentTime % 60) < 10 ? "0" : "",
	hundredthsSec = Math.floor(audio.currentTime % 60);
	$('#audioTimer').html(minute + ':' + tenthsSec + hundredthsSec);
	
	// Draw Canvas
	canvasCtx.fillStyle = " #1f1f24";
	canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
		
	rotations = rotations + curFrequency * 0.0000001;
		
	react_x = 0;
	react_y = 0;
	curFrequency = 0;

	analyser.getByteFrequencyData(frequencyArray);

	for (var i = 0; i < bgBar_Count; i++) {
		rads = Math.PI * 2 / bgBar_Count;

		bar_height = Math.max((frequencyArray[i] * 2.5 - 200), 0);
		bar_width = bar_height * 0.08;

		bar_x_term = center_x + Math.cos(rads * i + rotations) * (radius + bar_height);
		bar_y_term = center_y + Math.sin(rads * i + rotations) * (radius + bar_height);
						
		canvasCtx.strokeStyle = "rgba(" + (frequencyArray[i]).toString() + ", " + 50 + ", " + 50 + "," + .3 + ")";
		canvasCtx.lineWidth = bar_width;
		canvasCtx.beginPath();
		canvasCtx.moveTo(center_x, center_y);
		canvasCtx.lineTo(bar_x_term, bar_y_term);
		canvasCtx.stroke();
					
		react_x += Math.cos(rads * i + rotations) * (radius + bar_height);
		react_y += Math.sin(rads * i + rotations) * (radius + bar_height);
					
		curFrequency += bar_height;
	}

	center_x = canvas.width / 2 - (react_x * 0.007);
	center_y = canvas.height / 2 - (react_y * 0.007);
	let radiusMultiplier = $('body').width() / 25;
    radius = radiusMultiplier + (curFrequency * 0.003);
    // Make shapes rotate
    if(rotateNeg){shapeRotation += 1;}
    else {shapeRotation -= 1;}
    if (shapeRotation > 200){rotateNeg = false;}
    if (shapeRotation < -200){rotateNeg = true;}

	// Elipse middle
	canvasCtx.fillStyle = "white";
	canvasCtx.beginPath();
	canvasCtx.ellipse(center_x, center_y - 20, radius * (curFrequency * .000015), radius * (curFrequency * .00005), -( Math.PI / (2 + (shapeRotation/3)*.01)), 0, 2 * Math.PI);
	canvasCtx.fill();
	//Elipse right 3
	canvasCtx.fillStyle = "#ff0000";
	canvasCtx.beginPath();
	canvasCtx.ellipse(center_x + 30, center_y - 20, radius * (curFrequency * .000015), radius * (curFrequency * .00005), Math.PI / (4 + shapeRotation*.01), 0, 2 * Math.PI);
	canvasCtx.fill();
	//Elipse right 2
	canvasCtx.fillStyle = "#00ff37";
	canvasCtx.beginPath();
	canvasCtx.ellipse(center_x - 30, center_y - 20, radius * (curFrequency * .000015), radius * (curFrequency * .00005), Math.PI / (4 + shapeRotation*.01), 0, 2 * Math.PI);
	canvasCtx.fill();
	//Elipse right 1
	canvasCtx.fillStyle = "#ffea00";
	canvasCtx.beginPath();
	canvasCtx.ellipse(center_x, center_y - 20, radius * (curFrequency * .000015), radius * (curFrequency * .00005), Math.PI / (4 + shapeRotation*.01), 0, 2 * Math.PI);
	canvasCtx.fill();
	// Elipse left 3
	canvasCtx.fillStyle = "#00ccff";
	canvasCtx.beginPath();
	canvasCtx.ellipse(center_x - 30, center_y - 20, radius * (curFrequency * .000015), radius * (curFrequency * .00005), -( Math.PI / (4 + shapeRotation*.01)), 0, 2 * Math.PI);
	canvasCtx.fill();
	// Elipse left 2
	canvasCtx.fillStyle = "#f700ff";
	canvasCtx.beginPath();
	canvasCtx.ellipse(center_x + 30, center_y - 20, radius * (curFrequency * .000015), radius * (curFrequency * .00005), -( Math.PI / (4 + shapeRotation*.01)), 0, 2 * Math.PI);
	canvasCtx.fill();
	// Elipse left 1
	canvasCtx.fillStyle = "#0011ff";
	canvasCtx.beginPath();
	canvasCtx.ellipse(center_x, center_y - 20, radius * (curFrequency * .000015), radius * (curFrequency * .00005), -( Math.PI / (4 + shapeRotation*.01)), 0, 2 * Math.PI);
	canvasCtx.fill();


	// Circle 1	
	canvasCtx.fillStyle = " #1f1f24";
	canvasCtx.beginPath();
	canvasCtx.arc(center_x, center_y, radius + 2, 0, Math.PI * 2);
	canvasCtx.fill();
	
	// Logo
	canvasCtx.drawImage(logoImg,center_x - (radiusMultiplier + curFrequency*.0018),center_y - (radiusMultiplier + curFrequency*.0018),radius + radiusMultiplier,radius + radiusMultiplier);
}