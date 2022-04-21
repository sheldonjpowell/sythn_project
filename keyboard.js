const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const getElementByNote = (note) =>
  note && document.querySelector(`[note="${note}"]`);


const keys = {
    A: { element: getElementByNote("C"), note: "C", octaveOffset: 0 },
    W: { element: getElementByNote("C#"), note: "C#", octaveOffset: 0 },
    S: { element: getElementByNote("D"), note: "D", octaveOffset: 0 },
    E: { element: getElementByNote("D#"), note: "D#", octaveOffset: 0 },
    D: { element: getElementByNote("E"), note: "E", octaveOffset: 0 },
    F: { element: getElementByNote("F"), note: "F", octaveOffset: 0 },
    T: { element: getElementByNote("F#"), note: "F#", octaveOffset: 0 },
    G: { element: getElementByNote("G"), note: "G", octaveOffset: 0 },
    Y: { element: getElementByNote("G#"), note: "G#", octaveOffset: 0 },
    H: { element: getElementByNote("A"), note: "A", octaveOffset: 1 },
    U: { element: getElementByNote("A#"), note: "A#", octaveOffset: 1 },
    J: { element: getElementByNote("B"), note: "B", octaveOffset: 1 },
    K: { element: getElementByNote("C2"), note: "C", octaveOffset: 1 },
    O: { element: getElementByNote("C#2"), note: "C#", octaveOffset: 1 },
    L: { element: getElementByNote("D2"), note: "D", octaveOffset: 1 },
    P: { element: getElementByNote("D#2"), note: "D#", octaveOffset: 1 },
    semicolon: { element: getElementByNote("E2"), note: "E", octaveOffset: 1 }
  };

  const getHz = (note = "A", octave = 4) => {
    const A4 = 440;

    let octSlider = document.querySelector('input[className="octSlider"').value;
    octSlider = parseFloat(octSlider)
    let N = 0;
    switch (note) {
      default:
      case "A":
        N = 0;
        break;
      case "A#":
      case "Bb":
        N = 1;
        break;
      case "B":
        N = 2;
        break;
      case "C":
        N = 3;
        break;
      case "C#":
      case "Db":
        N = 4;
        break;
      case "D":
        N = 5;
        break;
      case "D#":
      case "Eb":
        N = 6;
        break;
      case "E":
        N = 7;
        break;
      case "F":
        N = 8;
        break;
      case "F#":
      case "Gb":
        N = 9;
        break;
      case "G":
        N = 10;
        break;
      case "G#":
      case "Ab":
        N = 11;
        break;
    }
    N += 12 * (octave - (octSlider + 3));
    return A4 * Math.pow(2, N / 12);
  };

const pressedNotes = new Map();
let clickedKey = "";



const playKey = (key) => {
    if (!keys[key]) {
      return;
    }


    let volumeSlider = document.querySelector('input[className="volumeSlider"').value;
    volumeSlider = parseFloat(volumeSlider)
    console.log(`${volumeSlider}`)

    let attackSlider = document.querySelector('input[className="attackSlider"').value;
    attackSlider = parseFloat(attackSlider)
    console.log(`${attackSlider}`)

    let decaySlider = document.querySelector('input[className="decaySlider"').value;
    decaySlider = parseFloat(decaySlider)
    console.log(`${decaySlider}`)

    let sustainSlider = document.querySelector('input[className="sustainSlider"').value;
    sustainSlider = parseFloat(sustainSlider)
    console.log(sustainSlider)


    let releaseSlider = document.querySelector('input[className="releaseSlider"').value;
    releaseSlider = parseFloat(releaseSlider)
    console.log(`${releaseSlider}`)
    
    const osc = audioContext.createOscillator();
    const noteGainNode = audioContext.createGain();
    
    noteGainNode.connect(audioContext.destination);
    console.log(`currentTime${audioContext.currentTime}`)


    const zeroGain = 0.000001;
    const maxGain = volumeSlider;
    const sustainedGain = 0.0001;
    noteGainNode.gain.value = zeroGain;
  
    const setAttack = () =>
    noteGainNode.gain.exponentialRampToValueAtTime(
      maxGain,
      audioContext.currentTime + attackSlider 
    );
      
    const setDecay = () =>
        noteGainNode.gain.linearRampToValueAtTime(
          sustainedGain,
            audioContext.currentTime + decaySlider
        );
    // const setSustain = () =>
    //   noteGainNode.gain.linearRampToValueAtTime(
    //     // maxGain,
    //     sustainedGain,
    //     audioContext.currentTime + sustainSlider
    //   );
    const setRelease = () =>
        noteGainNode.gain.linearRampToValueAtTime(
            zeroGain,
            audioContext.currentTime + releaseSlider
            
            );

    // let pulseTime = 1;
    // function playPulse(time) {
    //     let lfoHz = document.querySelector('#lfo').value;
    //     lfoHz = parseFloat(lfoHz)
    //     // let osc = audioContext.createOscillator();
    //     // osc.type = 'sine';
    //     // osc.frequency.value = pulseHz;

    //     let amp = audioContext.createGain();
    //     amp.gain.value = 1;

    //     let lfo = audioContext.createOscillator();
    //     lfo.type = 'square';
    //     lfo.frequency.value = lfoHz;

    //     lfo.connect(amp.gain);
    //     osc.connect(amp).connect(audioContext.destination);
    //     // lfo.start();a
    //     // osc.start(time);
    //     // osc.stop(pulseTime);
    // }
  
    setAttack();
    setDecay();
    // setSustain();
    setRelease();
    // setVolume();

    // playPulse()
    
      



    


    
    
    ///// This is the Waveform.js Connection/////
    osc.connect(noteGainNode);
    let inputSlider = document.querySelector('input[className="waveSlider"').value;
    console.log(inputSlider)
    osc.type = WAVEFORMS[inputSlider]
    // osc.type = "triangle";
  
    const freq = getHz(keys[key].note, (keys[key].octaveOffset || 0) + 3);
  
    if (Number.isFinite(freq)) {
      osc.frequency.value = freq;
    }
  
    keys[key].element.classList.add("pressed");
    pressedNotes.set(key, osc);
    pressedNotes.get(key).start();
  };

const stopKey = (key) => {
    if (!keys[key]) {
      return;
    }
    
    keys[key].element.classList.remove("pressed");
    const osc = pressedNotes.get(key);
  
    if (osc) {
  

      let sustainSlider = document.querySelector('input[className="sustainSlider"').value;
      sustainSlider = parseFloat(sustainSlider)
      console.log(sustainSlider)
      
      setTimeout(() => {
        osc.stop();
      }, sustainSlider);
  
      pressedNotes.delete(key);
    }
  };



/////THIS IS WHERE I ADD THE MIDI///////
document.addEventListener("keydown", (e) => {
    const eventKey = e.key.toUpperCase();
    const key = eventKey === ";" ? "semicolon" : eventKey;
    
    if (!key || pressedNotes.get(key)) {
      return;
    }
    playKey(key);
  });
  
  document.addEventListener("keyup", (e) => {
    const eventKey = e.key.toUpperCase();
    const key = eventKey === ";" ? "semicolon" : eventKey;
    
    if (!key) {
      return;
    }
    stopKey(key);
  });
  
  for (const [key, { element }] of Object.entries(keys)) {
    element.addEventListener("mousedown", () => {
      playKey(key);
      clickedKey = key;
    });
  }
  
  document.addEventListener("mouseup", () => {
    stopKey(clickedKey);
  });


// const freq = getHz(keys[key].note, (keys[key].octaveOffset || 0) + 3);




  