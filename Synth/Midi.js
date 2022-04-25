// const audioContext = new window.AudioContext();

// const oscillators = {};

// function midiToFreq(number) {
//     const a = 440;
//     return (a/ 32) * (2 ** ((number- 9) / 12));
// }

// if (navigator.requestMIDIAccess) {
//     navigator.requestMIDIAccess().then(success, failure)
// }

// function success(midiAccess) {
//     midiAccess.addEventListener('statechange', updateDevices);

//     const inputs = midiAccess.inputs;
    
//     inputs.forEach((input) =>{
//         input.addEventListener('midimessage', handleInput)
//     })
// }

// function handleInput(input){
//     const command = input.data[0];
//     const note = input.data[1];
//     const velocity = input.data[2];

//     switch (command){
//         case 144:
//         if(velocity > 0){
//             // note on
//             noteOn(note, velocity);
//         } else {
//             noteOff(note);
//         }
//         break;
//         case 128:
//         noteOff(note);
//             break; // note off
//     }    
// }


// function noteOn(note, velocity){
//     const osc = audioContext.createOscillator();

//     const oscGain = audioContext.createGain()
//     oscGain.gain.value = .33;
//     const velocityGainAmount = (1 / 127) * velocity;
//     const velocityGain = audioContext.createGain();
//     velocityGain.gain.value = velocityGainAmount;

//     osc.type = 'sine';
//     osc.frequency.value = midiToFreq(note);
//     console.log(note)
//     console.log(`NoteOn: ${osc.frequency.value}`)



//     osc.connect(oscGain);
//     oscGain.connect(velocityGain);
//     velocityGain.connect(audioContext.destination);

//     osc.gain = oscGain;
//     oscillators[note.toString()] = osc;
//     console.log(oscillators[note.toString()])


//     osc.start()
// }

// function noteOff(note){
//     const osc = oscillators[note.toString()];
//     const oscGain = osc.gain;
//     oscGain.gain.setValueAtTime(oscGain.gain.value, audioContext.currentTime);
//     oscGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.03);

//     setTimeout(() =>{
//         osc.stop();
//         osc.disconnect();
//     }, 20)
//     // osc.stop();

//     delete oscillators[note.toString()];
//     // console.log(oscillators)

// }


// function updateDevices(event){
//     console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State: ${event.port.state}, Type: ${event.port.type}`)

// }

// function failure() {
//     console.log('Couldnot connect MIDI')
// }
