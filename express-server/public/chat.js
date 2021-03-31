const socket = io()

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('sent');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', () => {
    sendMessage()
});

sendMessage = () => {
    let message_value = {
        username: username.value,
        message: message.value
    }
    socket.emit('chat:message', message_value)
    message.value = ''
}

demoForEnterKey = (eventName) => {
    if (eventName.keyCode == 13) {
        sendMessage()
        message.value = ''
    }
 }

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', {username: username.value, typing:true});
    setTimeout(() => {
        // enter this block of code after 1 second
        // handle stuff, call search API etc.
        socket.emit('chat:typing', {username: username.value, typing:false});
    }, 3000);
});

socket.on('chat:message', (data) => {
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
    // Clean actions
    actions.innerHTML = ``
    message.innerHTML = ``
});

// listent typing
socket.on('chat:typing', (data) => {
    if (data.typing === true) {
        actions.innerHTML = `<p><em>${data.username} is typing a message</em></p>`
    } else {
        actions.innerHTML = ``
    }
});