const context = new window.AudioContext();

document.querySelector('#success').addEventListener('click', () => {
    const actx = new (AudioContext || webkitAudioContext)();
    if (!actx) throw 'Not supported :(';

    //     let pulseHz = 440;
    // const hzControl = document.querySelector('#hz');
    // hzControl.addEventListener('input', function() {
    //     pulseHz = Number(this.value);
    // }, false);

    // let lfoHz = 30;
    // const lfoControl = document.querySelector('#lfo');
    // lfoControl.addEventListener('input', function() {
    //     lfoHz = Number(this.value);
    // }, false);
    // let pulseHz = document.querySelector('#hz').value;
    // pulseHz = parseFloat(pulseHz)
    
    
    let pulseTime = 1;
    function playPulse(time) {
        // let lfoHz = document.querySelector('#lfo').value;
        // lfoHz = parseFloat(lfoHz)
        // let osc = actx.createOscillator();
        // osc.type = 'sine';
        // osc.frequency.value = pulseHz;

        let amp = actx.createGain();
        amp.gain.value = 1;

        let lfo = actx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = lfoHz;

        lfo.connect(amp.gain);
        osc.connect(amp).connect(actx.destination);
        lfo.start();
        osc.start(time);
        osc.stop(pulseTime);
        // osc.stop(actx.currentTime + 5);
    }
    // osc.start();
    
playPulse()
})