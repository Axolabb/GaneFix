
const projects = document.querySelectorAll(".project");
const drop = document.querySelector(".drop");
const showcase = document.querySelector(".showcase");
const input = document.querySelector('.nameInput')
const button1 = document.querySelector('.button1')
const button2 = document.querySelector('.button2')

let start,
offsetY,
offsetX,
targetRect,
target,
dropped = false,
expanded = false;

const stopped = () => {
  start = false;
  if (target) {
    showcase.classList.remove("is-dragging");
    target.classList.remove("is-selected");
  }
  if (dropped) {
    showcase.classList.add("is-preview");
    target.classList.add("is-expanded");
    drop.classList.add("is-dropped");
    expanded = true;
    
  } else {
    showcase.classList.remove("is-preview");
    target.classList.remove("is-expanded");
    expanded = false;
    button1.style.display = 'flex';
  }
};

const started = (e, type) => {
  start = true;
  target = e.target;
  if (type === "touch") {
    button.classList.add('show')
    offsetY = target.offsetWidth / 2 + target.offsetTop;
    offsetX = target.offsetWidth / 2 + target.offsetLeft;
  } else {
    offsetY = e.offsetY + target.offsetTop;
    offsetX = e.offsetX + target.offsetLeft;
  }
  targetRect = target.getBoundingClientRect();
  target.classList.add("is-selected");
  showcase.classList.add("is-dragging");
};

projects.forEach(project => {
  project.addEventListener("mousedown", e => {
    started(e, "mouse");
    
  });
  project.addEventListener("touchstart", e => {
    started(e, "touch");
  });
});

const docUp = () => {
  if (!expanded && target) {
    stopped();
  }
};

document.addEventListener("mouseup", () => {
  docUp();
});
document.addEventListener("touchend", () => {
  docUp();
});

const docMove = (e, type) => {
  let clientX = 0,
    clientY = 0;

  if (type === "touch") {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  if (start && !expanded) {

    const containerRect = showcase.getBoundingClientRect();
    const minX = containerRect.left;
    const minY = containerRect.top;
    const maxX = containerRect.right - target.offsetWidth;
    const maxY = containerRect.bottom - target.offsetHeight;


    clientX = Math.max(minX, Math.min(clientX, maxX));
    clientY = Math.max(minY, Math.min(clientY, maxY));

    target.style.transform = `translateY(${clientY - offsetY}px) translateX(${clientX - offsetX}px)`;
  
  }
};

document.addEventListener("mousemove", e => {
  docMove(e, "mouse");
});
document.addEventListener("touchmove", e => {
  docMove(e, "touch");
});
// ----------------------------------- //

const balls = document.querySelectorAll('.ball');
balls.forEach(ball => {
  ball.onmousedown = function(event) {
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;

    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    document.body.append(ball);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      ball.style.left = pageX - shiftX + 'px';
      ball.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
    };

    ball.ondragstart = function() {
      return false;
    };
  };
});

const ballContainer = document.querySelector('.balls');
const clear = document.querySelector('.clear');



// ----------------------------------- //
const track = document.querySelector('.track')
let counter = 0;
let timer;
let AudioCounter = 1;
let isRecording = false;
let AudioSec = 0;


document.querySelector('.playMedia').addEventListener('click', () => {
  if(track.style.paddingLeft === '93%') {
    track.style.transition = '0s';
    track.style.paddingLeft = '0%';
    setTimeout(() => {
      track.style.transition = AudioSec;
      track.style.paddingLeft = '93%';
    }, 1);
    
  } else {
    track.style.transition = AudioSec;
  track.style.paddingLeft = '93%';
  
  }
  
});

document.querySelector('.micro').addEventListener('click', function() {
  if (!isRecording) {
    timer = setInterval(function() {
      counter++;
      AudioCounter++;
      let hours = Math.floor(counter / 3600);
      let minutes = Math.floor((counter % 3600) / 60);
      let seconds = counter % 60;
      document.querySelector('.counter').textContent = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }, 1000);
    isRecording = true;
  } else {
    clearInterval(timer);
    counter = 0;
    document.querySelector('.counter').textContent = '0:00:00';
    timer = null;
    track.style.transition += AudioCounter + 's';
    AudioSec = AudioCounter + 's';
    AudioCounter = 0;
    isRecording = false;
  }
});


const startStopButton = document.querySelector('#startRecord'); 
let chunks = [];
let mediaRecorder;
let recording = false; 

startStopButton.onclick = function() {
  if (!recording) { 
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        chunks = [];
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        }
        mediaRecorder.start();
        recording = true;
        if (audio) {
          audio.pause(); 
        }
      });
  } else {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      button2.style.display = 'flex'
    }
    recording = false;
  }
}
const playRecordingButton = document.querySelector('#playRecording')
playRecordingButton.onclick = function() { 
  if (chunks.length > 0) {
    const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
    const audioURL = window.URL.createObjectURL(blob);
    audio = new Audio(audioURL);
    audio.play();
  }
}  

// ----------------------------------- //

const start1 = document.querySelector('.start1')
const start2 = document.querySelector('.start2')
const pageFirst = document.querySelector('.pageFirst')
const pageDrag = document.querySelector('.pageDrag')
const pageName = document.querySelector('.pageName')
const pagePicture = document.querySelector('.pagePicture')
const pageShare = document.querySelector('.pageShare')
const pageAudio = document.querySelector('.pageAudio')
const pageAudioListen = document.querySelector('.pageAudioListen')
const shareButtons = document.querySelectorAll('.share-button')
let buttonCount = 0


start1.addEventListener('click', () => {
  pageFirst.style.display = 'none';
  pageDrag.style.display = 'flex'
})

start2.addEventListener('click', () => {
  pageFirst.style.display = 'none';
  pageName.style.display = 'flex'
  if(buttonCount == 0) {
    button2.style.display = 'none'
  }
})
button1.addEventListener('click', () => {
   if(buttonCount === 0) {
    pageDrag.style.display = 'none';
    pagePicture.classList.add('pictireView')
    buttonCount++
   } else {
    location.reload()
   }
})
button2.addEventListener('click', () => {
  if(buttonCount === 0) {
    pageName.style.display = 'none';
    pageShare.style.display = 'flex'
    button2.style.display = 'none';
    buttonCount++
  } else if(buttonCount === 1) {
    pageAudio.style.display = 'none';
    buttonCount++
  }
  if(buttonCount === 2) {
    pageAudioListen.style.display = 'flex'
    buttonCount++
  } else if (buttonCount === 3) {
    location.reload();
  }
  console.log(buttonCount)
})
shareButtons.forEach(button => {
  button.addEventListener('click', () => {
    pageShare.style.display = 'none';
    pageAudio.style.display = 'flex'
  });
});

const Name = document.querySelector('.textName')
const inputName = document.querySelector('.nameInput')
const textName = document.querySelector('.textName')
inputName.addEventListener('input', () => {
  if(inputName.value == '') {
    button2.style.display = 'none';
  } else {
    textName.innerHTML = 'чем ты хотел(-а) бы поделиться, ' + inputName.value + '?'
    button2.style.display = 'flex';
  }
})

