
// const context = new window.AudioContext();

const WAVEFORMS = {
    0:'sine',
    .25:'square',
    .50:'sawtooth',
    .75:'triangle'
};


// document.querySelector('#success').addEventListener('click', () => {
//     const actx = new (AudioContext || webkitAudioContext)();
//     if (!actx) throw 'Not supported :(';
//     const osc = actx.createOscillator();
//     osc.frequency.value = 440;
//     osc.connect(actx.destination);
//     // I want the input slider (0, .25, .50, .75) to show up with the sound
//     // osc.type = WAVEFORMS[inputSlider]
//     console.log(WAVEFORMS[inputSlider])
  
//     osc.start();
//     osc.stop(actx.currentTime + 2);
    
    

// })


