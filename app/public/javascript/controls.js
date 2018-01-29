//frame rates, TO DO get them from the parsed file;
/*
var frameTimeT = 1/25;
var frameTimeGP = 1/60;
*/



function play(v_index){

	//plays the right video : index 1 -> videoT, index 2 -> videoGP

	if(v_index == 1){
		if(videoT.paused)
			videoT.play()

	}
	else if(v_index == 2){
		if(videoGP.paused)
			videoGP.play();

	}
	else{
		alert("Error play(): video index invalid");
	}

}


function pause(v_index){

	//pauses the right video : index 1 -> videoT, index 2 -> videoGP

	if(v_index == 1){
		if(!videoT.paused)
			videoT.pause()
	}
	else if(v_index == 2){
		if(!videoGP.paused)
			videoGP.pause();
	}
	else{
		alert("Error pause(): video index invalid");
	}

}

function stop(v_index){

	//stops the right video : index 1 -> videoT, index 2 -> videoGP

	if(v_index == 1){
		pause(1);
		videoT.currentTime = 0;
	}
	else if(v_index == 2){
		pause(2);
		videoGP.currentTime = 0;
	}
	else{
		alert("Error : video index invalid");
	}

}

//spacebar = play/pause
//is not working yet : videoT is playing for only 1sec before pausing, I don't know why
/*
document.onkeypress=function(){
	var key = window.event.keyCode;
	if(key==32){

		if(videoT.paused && videoGP.paused){
			videoT.play();
			videoGP.play();
		}

		else if(!videoT.paused && !videoGP.paused){
			videoT.pause();
			videoGP.pause();
		}
		else{}

	}
}
*/

function next_frame(v_index){
	if(v_index == 1){
		videoT.currentTime += parseFloat(localStorage.getItem('frameTimeT'));
	}
	else if(v_index == 2){
		videoGP.currentTime += parseFloat(localStorage.getItem('frameTimeGP'));
	}
	else if(v_index==3){
		videoT.currentTime += parseFloat(localStorage.getItem('frameTimeT'));
		videoGP.currentTime += parseFloat(localStorage.getItem('frameTimeT'));
	}
	else{
		alert("Error next_frame() : video index invalid");
	}
}

function previous_frame(v_index){
	if(v_index == 1){
		videoT.currentTime -= parseFloat(localStorage.getItem('frameTimeT'));
	}
	else if(v_index == 2){
		videoGP.currentTime -= parseFloat(localStorage.getItem('frameTimeGP'));
	}
	else if(v_index==3){
		videoT.currentTime -= parseFloat(localStorage.getItem('frameTimeT'));
		videoGP.currentTime -= parseFloat(localStorage.getItem('frameTimeT'));
	}
	else{
		alert("Error previous_frame() : video index invalid");
	}
}

function preview_play(){
	//plays both videos from the init frame given by the synchronization point
		if( videoT.currentTime == 0 && videoGP.currentTime == 0){
			var sync_time_T = localStorage.getItem('sync_frame_T') * localStorage.getItem('frameTimeT');
			var sync_time_GP = localStorage.getItem('sync_frame_GP') * localStorage.getItem('frameTimeGP');
			if(sync_time_T > sync_time_GP){
				videoT.currentTime = sync_time_T - sync_time_GP;
				videoGP.currentTime = 0;
				localStorage.setItem('start_frame_T', Math.round((sync_time_T - sync_time_GP)/localStorage.getItem('frameTimeT')));
				localStorage.setItem('start_frame_GP', 0);
			}
			else{
				videoT.currentTime = 0;
				videoGP.currentTime = sync_time_GP - sync_time_T;
				localStorage.setItem('start_frame_T', 0);
				localStorage.setItem('start_frame_GP', Math.round((sync_time_GP - sync_time_T)/localStorage.getItem('frameTimeGP')));
			}
		}
		play(1);
		play(2);
}

function preview_stop(){
	//stops both videos

		pause(1);
		videoT.currentTime = localStorage.getItem('start_frame_T') * localStorage.getItem('frameTimeT');

		pause(2);
		videoGP.currentTime = localStorage.getItem('start_frame_GP') * localStorage.getItem('frameTimeGP');

}



function get_sync_frame(v_index){
	if(v_index == 1){
		document.getElementById("sync_frame_T").innerHTML = Math.round(videoT.currentTime/localStorage.getItem('frameTimeT'));
		localStorage.setItem('sync_frame_T', Math.round(videoT.currentTime/localStorage.getItem('frameTimeT')));


	}
	else if(v_index == 2){
		document.getElementById("sync_frame_GP").innerHTML = Math.round(videoGP.currentTime/localStorage.getItem('frameTimeGP'));
		localStorage.setItem('sync_frame_GP', Math.round(videoGP.currentTime/localStorage.getItem('frameTimeGP')));
	}
	else{
		alert("Error get_sync_frame() : video index invalid");
	}

}

function go_to_sync_frame(v_index){
	if(v_index == 1){
		videoT.currentTime = document.getElementById("sync_frame_T").innerHTML * localStorage.getItem('frameTimeT');
	}
	else if(v_index == 2){
		videoGP.currentTime = document.getElementById("sync_frame_GP").innerHTML * localStorage.getItem('frameTimeGP');
	}
	else{
		alert("Error go_to_sync_frame() : video index invalid");
	}
}

//set sync frames fields when the page load
function set_sync_frames(){
	if(localStorage.getItem('sync_frame_T') && localStorage.getItem('sync_frame_GP')){
		document.getElementById("sync_frame_T").innerHTML = localStorage.getItem('sync_frame_T');
		document.getElementById("sync_frame_GP").innerHTML = localStorage.getItem('sync_frame_GP');
	}

	document.getElementById("videoID").innerHTML = localStorage.getItem('videoID');
}

//updates the video current time with the slidebar

function update_frame(v_index){

	if(v_index == 1){
		videoT.currentTime = document.getElementById("slidebar_T").value/100* videoT.duration;
	}
	else if(v_index ==2){
		videoGP.currentTime = document.getElementById("slidebar_GP").value/100 *videoGP.duration;
	}
	else{
		alert("Error update_frame() : video index invalid");
	}


}

function reset(){
	localStorage.clear();
}


function get_start_end_frames(){
	var sync_time_T = localStorage.getItem('sync_frame_T') * localStorage.getItem('frameTimeT');
	var sync_time_GP = localStorage.getItem('sync_frame_GP') * localStorage.getItem('frameTimeGP');
	if(sync_time_T > sync_time_GP){
		localStorage.setItem('start_frame_T', Math.round((sync_time_T - sync_time_GP)/localStorage.getItem('frameTimeT')));
		localStorage.setItem('start_frame_GP', 0);

		if((videoT.duration - (sync_time_T - sync_time_GP)) < videoGP.duration){
			localStorage.setItem('end_frame_T', Math.round(videoT.duration/localStorage.getItem('frameTimeT')));
			localStorage.setItem('end_frame_GP', Math.round((videoT.duration - (sync_time_T - sync_time_GP))/localStorage.getItem('frameTimeGP')));
		}
		else{
			localStorage.setItem('end_frame_T', Math.round((videoG.duration + (sync_time_T - sync_time_GP)) /localStorage.getItem('frameTimeT')));
			localStorage.setItem('end_frame_GP', Math.round(videoGP.duration/localStorage.getItem('frameTimeGP')));
		}
	}
	else{
		localStorage.setItem('start_frame_T', 0);
		localStorage.setItem('start_frame_GP', Math.round((sync_time_GP - sync_time_T)/localStorage.getItem('frameTimeGP')));

		if(videoT.duration < (videoGP.duration - (sync_time_GP - sync_time_T))){
			localStorage.setItem('end_frame_T', Math.round(videoT.duration/localStorage.getItem('frameTimeT')));
			localStorage.setItem('end_frame_GP', Math.round((videoT.duration + (sync_time_GP - sync_time_T))/localStorage.getItem('frameTimeGP')));
		}
		else{
			localStorage.setItem('end_frame_T', Math.round((videoG.duration - (sync_time_GP - sync_time_T)) /localStorage.getItem('frameTimeT')));
			localStorage.setItem('end_frame_GP', Math.round(videoGP.duration/localStorage.getItem('frameTimeGP')));
		}
	}
}


function loadXML(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        readXML(this);
	    }
	};

	xhttp.open("GET", "data.xml", true);
	//xhttp.open("GET", "../public/data.xml", true);
	xhttp.send();
//	readXML(xhttp);
}

function readXML(xml){
	var data = xml.responseXML;
	localStorage.setItem('frameTimeT', 1/( data.getElementsByTagName('current_observation')[0].getElementsByTagName('frameRate_g')[0].childNodes[0].nodeValue ));
	localStorage.setItem('frameTimeGP', 1/( data.getElementsByTagName('current_observation')[0].getElementsByTagName('frameRate_l')[0].childNodes[0].nodeValue ));
	localStorage.setItem('videoID', data.getElementsByTagName('current_observation')[0].getElementsByTagName('videoName')[0].childNodes[0].nodeValue);
	localStorage.setItem('delayRL',data.getElementsByTagName('current_observation')[0].getElementsByTagName('delayRL')[0].childNodes[0].nodeValue);


}


//save the informations needed
function save(){

	get_start_end_frames();

	var frameRateT = 1/localStorage.getItem('frameTimeT');
	var frameRateGP = 1/localStorage.getItem('frameTimeGP');

	var delayRL = parseInt(localStorage.getItem('delayRL'));
	if(delayRL <0){ //case where the delay between the two gopro videos is negative, we couldn't begin video_R before 0
		var start_frame_G = parseInt(localStorage.getItem('start_frame_T')) - delayRL;
		var start_frame_L = parseInt(localStorage.getItem('start_frame_GP')) - delayRL;
		var start_frame_R = parseInt(localStorage.getItem('start_frame_GP'));
	}
	else{
		var start_frame_G = localStorage.getItem('start_frame_T') ;
		var start_frame_L = localStorage.getItem('start_frame_GP');
		var start_frame_R = parseInt(localStorage.getItem('start_frame_GP')) + delayRL;
	}

	var synch_frame_R = parseInt(localStorage.getItem('sync_frame_GP')) + delayRL;
	var end_frame_R = parseInt(localStorage.getItem('end_frame_GP')) + delayRL;


	var xmltext = "<informations><videoID>"+ localStorage.getItem('videoID') +" </videoID><frame_rate_G>" +
		frameRateT + "</frame_rate_G><synch_frame_G>" +
		localStorage.getItem('sync_frame_T') + "</synch_frame_G><start_frame_G>" +
		start_frame_G + "</start_frame_G><end_frame_G>" +
		localStorage.getItem('end_frame_T') + "</end_frame_G><frame_rate_L>" +
		frameRateGP + "</frame_rate_L><synch_frame_L>" +
		localStorage.getItem('sync_frame_GP') + "</synch_frame_L><start_frame_L>" +
		start_frame_L + "</start_frame_L><end_frame_L>" +
		localStorage.getItem('end_frame_GP') + "</end_frame_L><frame_rate_R>" +
		frameRateGP + "</frame_rate_R><synch_frame_R>" +
		synch_frame_R + "</synch_frame_R><start_frame_R>" +
		start_frame_R + "</start_frame_R><end_frame_R>" +
		end_frame_R + "</end_frame_R></informations>";



	var bb = new Blob([xmltext], {type: 'text/plain'});

	var pom = document.createElement('a');
	pom.setAttribute('href', window.URL.createObjectURL(bb));
	pom.setAttribute('download', localStorage.getItem('videoID')+"_synchro.xml");

	pom.style.display = 'none';
	document.body.appendChild(pom);

	pom.click();

	document.body.removeChild(pom);


}
