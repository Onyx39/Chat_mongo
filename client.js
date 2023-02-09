const socket = new WebSocket("ws://localhost:4420");
const form = document.querySelector("form");
const messageInput = document.getElementById("message");

socket.onopen = function(event) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    socket.send(messageInput.value);
  });
};

socket.onmessage = function(event) {
  console.log("Message from server: " + event.data);
};

socket.onclose = function(event) {
  console.log("Connection closed with code: " + event.code);
};
