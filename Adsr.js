const context = new window.AudioContext();

// let inputSlider = document.querySelector('input[className="waveSlider"').value;

// document.querySelector('#attack').addEventListener('click', () => {
//     const actx = new (AudioContext || webkitAudioContext)();
//     if (!actx) throw 'Not supported :(';
//     const osc = actx.createOscillator();
//     osc.frequency.value = 440;
//     osc.connect(actx.destination);
//     osc.type = 'sawtooth'
    
//     osc.stop(actx.currentTime + 2);
//     osc.start();
    
// })
    

const ADSR = {
        attack: 2,
        decay: 0,
        sustain: 1,
        release: 0.3
    };
    
    
    
    const STAGE_MAX_TIME = 2;
    
    
    
    const noteOn = (freq) => {
        gainNode.gain.cancelScheduledValues();
        
        const osc = createOscillator(freq);
        osc.connect(gainNode);
        
        // ADSR //
        const now = actx.currentTime;
        const atkDuration = ADSR.attack * STAGE_MAX_TIME;
        const atkEndTime = now + atkDuration;
        const decayDuration = ADSR.decay * STAGE_MAX_TIME;
        
        gainNode.gain.setValueAtTime(0, actx.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, atkEndtime);
        gainNode.gain.setTargetAtTime(ADSR.sustain, atkEndtime, decayDuration);
        
    };
    
    const noteOff = () => {
        gainNode.gain.cancelScheduledValues();
        
        // SUSTAIN, RELEASE
        const now = actx.currentTime;
        const relDuration = ASDR.release * STAGE_MAX_TIME;
        const relEndTime = now + relDuration;
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        asdrNode.gain.linearRampToValueAtTime(0, relEndTime)
    };
    
// document.querySelector('input[className="attackSlider"').value = ADSR.attack
// console.log(ADSR.attack)
