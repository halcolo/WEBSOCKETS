<template>
  <div class="card mt-3">
      <div class="card-body">
          <div class="card-header">
              <h3>Chat Websocket</h3>
          </div>
          <div class="card-body">
              <div class="messages">
                  <p v-for="message in messages" :key="message">{{message.username}}: {{message.message}}</p>
              </div>
          </div>
        <div v-if="typingValidation" class="text-muted">
            <div class="" style="width: 18rem;">
                <p class=""><img class="img-typing" src="../assets/loading-lazy.gif" alt=""><em>{{ typingData.username }} is typing</em></p>
            </div>
        </div>
      </div>
      <div class="card-footer">
          <form @submit.prevent="sendMessage">
              <div class="gorm-group">
                  <label for="username">username:</label>
                  <input type="text" v-model="username" class="form-control">
              </div>
              <div class="gorm-group pb-3">
                  <label for="message">Message:</label>
                  <input @keypress="typingMessage"  type="text" v-model="message" class="form-control">
              </div>
              <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">Send</button>
              </div>
          </form>
      </div>
  </div>
</template>
<script>
import io from 'socket.io-client';

export default {
    data () {
        return {
            username: '',
            message: '',
            messages: [],
            messageValue: {},
            typingValue: {},
            timeout: null,
            typingData: null,
            typingValidation: false,
            awaitingTyping: false,
            socket: io('localhost:3000')
        }
    },
    methods: {
        sendMessage (e) {
            e.preventDefault();
            this.messageValue = {
                username: this.username,
                message: this.message
            }
            this.socket.emit('chat:message', this.messageValue);
            this.message = ''
        },
        typingMessage () {
            clearTimeout(this.timeout);
            this.typingValue = {
                username: this.username, 
                typing: true
                }
            this.socket.emit('chat:typing', this.typingValue);
            this.timeout = setTimeout(() => {
                // enter this block of code after 1 second
                // handle stuff, call search API etc.
                this.typingValue['typing'] = false
                    this.typingstop(this.typingValue)
                console.log
            }, 3000);
        },
        typingstop (typingValue) {
            this.socket.emit('chat:typing', typingValue);
        }
    },
    mounted() {
        this.socket.on('chat:message', (data) => {
            this.messages.push(data)
        })
        this.socket.on('chat:typing', (data) => {
            this.typingData = data
            this.typingValidation = this.typingData.typing
        })
    },
}
</script>
<style>
.img-typing {
    width: 50px !important;
}
</style>