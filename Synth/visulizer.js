// // var audioContext = new (window.AudioContext || window.webkitAudioContext)();
// var analyser = audioContext.createAnalyser();
// video = document.querySelector('#video').value;

// source = audioContext.createMediaStreamSource(stream);
// source.connect(analyser);
// analyser.connect(distortion);
// distortion.connect(audioContext.destination);


// analyser.fftSize = 2048;
// var bufferLength = analyser.frequencyBinCount;
// var dataArray = new Uint8Array(bufferLength);

// canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

// function draw() {
//     var drawVisual = requestAnimationFrame(draw);
//     analyser.getByteTimeDomainData(dataArray);

//     canvasCtx.fillStyle = 'rgb(200, 200, 200)';
//     canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

//     canvasCtx.lineWidth = 2;
//     canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
//     canvasCtx.beginPath();

//     var sliceWidth = WIDTH * 1.0 / bufferLength;
//     var x = 0;

//     for(var i = 0; i < bufferLength; i++) {

//         var v = dataArray[i] / 128.0;
//         var y = v * HEIGHT/2;

//         if(i === 0) {
//           canvasCtx.moveTo(x, y);
//         } else {
//           canvasCtx.lineTo(x, y);
//         }

//         x += sliceWidth;
//       }

//       canvasCtx.lineTo(canvas.width, canvas.height/2);
//       canvasCtx.stroke();
//     };

    
    
// draw();











// analyser.getByteTimeDomainData(dataArray);





// /// Creating a waveform ///

