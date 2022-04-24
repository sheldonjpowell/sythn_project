const context = new window.AudioContext();


const ADSR = {
    1: 'lowpass',
    2: 'highpass',
    3: 'bandpass',
    4: 'notch'
};

document.querySelector('#success').addEventListener('click', () => {
    const actx = new (AudioContext || webkitAudioContext)();
    if (!actx) throw 'Not supported :(';
    
    
    const osc = actx.createOscillator();
    
    
    let frequencySlider = document.querySelector('input[className="frequencySlider"').value;
        frequencySlider = parseFloat(frequencySlider)
        console.log(frequencySlider)
    
    let qSlider = document.querySelector('input[className="qSlider"').value;
        qSlider = parseFloat(qSlider)
        console.log(qSlider)

    const maxFilterFreq = actx.sampleRate / 2;
    const filter = actx.createBiquadFilter();
    osc.type = 'sawtooth'
    filter.type = 'bandpass';
    filter.frequency.value = frequencySlider * maxFilterFreq;
    filter.Q.value = qSlider * -30;
    console.log(`maxFilter: ${maxFilterFreq}`)
    console.log(`filter: ${frequencySlider}`)
    console.log(`filterValue: ${filter.frequency.value}`)
    console.log(`Q: ${qSlider}`)
    console.log(`filterQ: ${filter.Q.value}`)

    osc.connect(filter);
    // osc.frequency.value = 440;
    filter.connect(actx.destination);
    // osc.connect(actx.destination);

//     // I want the input slider (0, .25, .50, .75) to show up with the sound
//     // osc.type = WAVEFORMS[inputSlider]
//     console.log(WAVEFORMS[inputSlider])
  
    osc.start();
    osc.stop(actx.currentTime + 5);
    
    

})