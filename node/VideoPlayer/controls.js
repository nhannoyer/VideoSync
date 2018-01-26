//frame rates, TO DO get them from the parsed file;
var frameTimeT = 1/25; 
var frameTimeGP = 1/60;




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
		videoT.currentTime += frameTimeT;
	}
	else if(v_index == 2){
		videoGP.currentTime += frameTimeGP;
	}
	else{
		alert("Error next_frame() : video index invalid");
	}
}

function previous_frame(v_index){
	if(v_index == 1){
		videoT.currentTime -= frameTimeT;
	}
	else if(v_index == 2){
		videoGP.currentTime -= frameTimeGP;
	}
	else{
		alert("Error previous_frame() : video index invalid");
	}
}

function preview_play(){
	//plays both videos from the init frame given by the synchronization point
		if( videoT.currentTime == 0 && videoGP.currentTime == 0){
			var sync_time_T = localStorage.getItem('sync_frame_T') * frameTimeT;
			var sync_time_GP = localStorage.getItem('sync_frame_GP') * frameTimeGP;
			if(sync_time_T > sync_time_GP){
				videoT.currentTime = sync_time_T - sync_time_GP;
				videoGP.currentTime = 0;
				localStorage.setItem('start_frame_T', (sync_time_T - sync_time_GP)/frameTimeT);
				localStorage.setItem('start_frame_GP', 0);
			}
			else{
				videoT.currentTime = 0;
				videoGP.currentTime = sync_time_GP - sync_time_T;
				localStorage.setItem('start_frame_T', 0);
				localStorage.setItem('start_frame_GP', (sync_time_GP - sync_time_T)/frameTimeGP);
			}
		}
		play(1);
		play(2);
}

function preview_stop(){
	//stops both videos
	
		pause(1);
		videoT.currentTime = localStorage.getItem('start_frame_T') * frameTimeT;

		pause(2);
		videoGP.currentTime = localStorage.getItem('start_frame_GP') * frameTimeGP;

}



function get_sync_frame(v_index){
	if(v_index == 1){
		document.getElementById("sync_frame_T").innerHTML = Math.round(videoT.currentTime/frameTimeT);
		localStorage.setItem('sync_frame_T', Math.round(videoT.currentTime/frameTimeT));
		
		
	}
	else if(v_index == 2){
		document.getElementById("sync_frame_GP").innerHTML = Math.round(videoGP.currentTime/frameTimeGP);
		localStorage.setItem('sync_frame_GP', Math.round(videoGP.currentTime/frameTimeGP));
	}
	else{
		alert("Error get_sync_frame() : video index invalid");
	}
	
}

function go_to_sync_frame(v_index){
	if(v_index == 1){
		videoT.currentTime = document.getElementById("sync_frame_T").innerHTML * frameTimeT;
	}
	else if(v_index == 2){
		videoGP.currentTime = document.getElementById("sync_frame_GP").innerHTML * frameTimeGP;
	}
	else{
		alert("Error go_to_sync_frame() : video index invalid");
	}
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


//save the sync point
function save(){
	/*
	var txtFile = "sync_frames.txt";
	var file = new File([""],txtFile);
	
	file.open("w");
	file.writeln(document.getElementById("sync_frame_T").innerHTML);
	file.writeln(document.getElementById("sync_frame_GP").innerHTML);
	file.close();
	*/
	/*
	var fd = fopen("sync_frames.txt");
	fwrite(fd, document.getElementById("sync_frame_T").innerHTML);
	fclose(fd);
	*/
	/*
	 set fso = new ActiveXObject("Scripting.FileSystemObject");  
	 set s = fso.CreateTextFile("sync_frames.txt", True);
	 s.writeline(document.getElementById("sync_frame_T").innerHTML);
	 s.Close();
	 */
	  var pom = document.createElement('a');
	  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
			  encodeURIComponent(localStorage.getItem('sync_frame_T') + " " + localStorage.getItem('sync_frame_GP')));
			  //encodeURIComponent(document.getElementById("sync_frame_T").innerHTML + " " + document.getElementById("sync_frame_GP").innerHTML));
	  pom.setAttribute('download', "sync_frames.txt");
	  //pom.setAttribute('desktop/Synchro_Corpus', "sync_frames.txt");

	  pom.style.display = 'none';
	  document.body.appendChild(pom);

	  pom.click();

	  document.body.removeChild(pom);
}

function preview(){
	
	
}


function calc_beg_frames(){
	if(sync_frame_T < sync_frame_GP){
		beg_frame_T = 0;
		beg_frame_GP = sync_frame_GP - sync_frame_T;
	}
	else {
		beg_frame_T = sync_frame_T - sync_frame_GP;
		beg_frame_GP = 0;
	}
}




