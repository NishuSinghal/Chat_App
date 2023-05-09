const socket=io('http://localhost:8000');

const form=document.getElementById('sendContainer');
const msgInput=document.getElementById('msgInput');
const container=document.querySelector('.container');
let audio=new Audio('ting.mp3')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const msg=msgInput.value;
    append(`You : ${msg}`,'right');
    socket.emit('send',msg);
    msgInput.value='';
    if(position==left){
        audio.play();
    }
})

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.append(messageElement);
}

//Ask new user his or her name and let the server know
const name= prompt('Enter your name to join');
socket.emit('new-user-joined',name);

//if new user joins , let others know his or her name
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left')
})

//if server sends a msg, recieve it
socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left')
})

//if user leave let others know
socket.on('leave',name=>{
    append(`${name} left the chat`,'left')
})