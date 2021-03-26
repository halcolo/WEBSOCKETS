const socket = io()

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('sent');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', () => {
    let message_value = {
        username: username.value,
        message: message.value
    }
    socket.emit('chat:message', message_value)
});

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
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
    actions.innerHTML = `<p><em>${data} is typing a message</em></p>`
});