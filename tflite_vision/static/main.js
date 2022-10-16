const addLocalVideo = async () => {
    const track = await Twilio.Video.createLocalVideoTrack();
    const video = document.getElementById('local').firstElementChild;
    video.appendChild(track.attach());
  };
  
  addLocalVideo();
  const usernameInput = document.getElementById('username');
const button = document.getElementById('join_leave');
const container = document.getElementById('container');
const count = document.getElementById('count');
let connected = false;
let room;

const connectButtonHandler = async (event) => {
  event.preventDefault();
  if (!connected) {
    const username = usernameInput.value;
    if (!username) {
      alert('Enter your name before connecting');
      return;
    }
    button.disabled = true;
    button.innerHTML = 'Connecting...';
    try {
      await connect(username);
      button.innerHTML = 'Leave call';
      button.disabled = false;
    }
    catch {
      alert('Connection failed. Is the backend running?');
      button.innerHTML = 'Join call';
      button.disabled = false;    
    }
  }
  else {
    disconnect();
    button.innerHTML = 'Join call';
    connected = false;
  }
};
const connect = async (username) => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username}),
    });
    const data = await response.json();
    room = await Twilio.Video.connect(data.token);
    room.participants.forEach(participantConnected);
    room.on('participantConnected', participantConnected);
    room.on('participantDisconnected', participantDisconnected);
    connected = true;
    updateParticipantCount();
  };

addLocalVideo();
button.addEventListener('click', connectButtonHandler);