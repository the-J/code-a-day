<template>
    <div class="container">
        <h3 class=" text-center">Messaging</h3>

        <div class="messaging">
            <div class="inbox_msg">
                <div class="inbox_people">
                    <div class="headind_srch">
                        <div class="recent_heading">
                            <h4>Recent</h4>
                        </div>

                        <div class="srch_bar">
                            <div class="stylish-input-group">
                                <input type="text" class="search-bar" placeholder="Search">
                                <span class="input-group-addon">
                                    <button type="button">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="inbox_chat">

                        <div class="chat_list">
                            <div class="chat_people">
                                <div class="chat_img">
                                    <img src="https://via.placeholder.com/150" alt="sunil">
                                </div>

                                <div class="chat_ib">
                                    <h5>Kitty Kat <span class="chat_date">Dec 25</span></h5>
                                    <p>Meow Meow Meow.</p>
                                </div>
                            </div>
                        </div>

                        <div class="chat_list">
                            <div class="chat_people">
                                <div class="chat_img">
                                    <img src="https://via.placeholder.com/150" alt="sunil">
                                </div>

                                <div class="chat_ib">
                                    <h5>Terminator<span class="chat_date">Dec 27</span></h5>
                                    <p>I'll be back.</p>
                                </div>
                            </div>
                        </div>

                        <div class="chat_list">
                            <div class="chat_people">
                                <div class="chat_img">
                                    <img src="https://via.placeholder.com/150" alt="sunil">
                                </div>

                                <div class="chat_ib">
                                    <h5>Marco Polo<span class="chat_date">Dec 28</span></h5>
                                    <p>I see you sson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mesgs">
                    <div class="msg_history">
                        <div v-for="message in messages">
                            <div :class="[message.author === authUser.displayName ? 'sent_msg' : 'received_msg']">
                                <div class="received_withd_msg">
                                    <p>{{message.message}}</p>
                                    <span class="time_date">{{message.author}}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="type_msg">
                        <div class="input_msg_write">
                            <input
                                    @keyup.enter="saveMessage"
                                    v-model="message"
                                    type="text"
                                    class="write_msg"
                                    placeholder="Type a message"
                            />
                            <button class="msg_send_btn" type="button">
                                <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'PrivateChat',

        data() {
            return {
                message: null,
                messages: [],
                authUser: {}
            };
        },

        methods: {
            scrollToBottom() {
                let box = document.querySelector('.msg_history');
                box.scrollTop = box.scrollHeight;
            },
            saveMessage() {
                // save to firestore
                db.collection('chat')
                    .add({
                        message: this.message,
                        author: this.authUser.displayName,
                        createdAt: new Date()
                    })
                    .then(() => {
                        this.scrollToBottom();
                    });

                this.message = null;
            },
            fetchMessages() {
                db.collection('chat')
                    .orderBy('createdAt')
                    .onSnapshot(querySnapshot => {
                        let allMessages = [];
                        querySnapshot.forEach(doc => allMessages.push(doc.data()));

                        this.messages = allMessages;

                        setTimeout(() => this.scrollToBottom(), 500);
                    });
            }
        },

        created() {
            // assign user when component created
            firebase.auth().onAuthStateChanged((user => {
                if (user) {
                    this.authUser = user;
                }
                else {
                    this.authUser = {};
                }
            }));

            //fetch messages from firebase when created
            this.fetchMessages();
        },

        beforeRouteEnter( to, from, next ) {
            // 'vm' acts as 'this' because this junk of code executes before this is available
            next(vm => {

                // check users state
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        next();
                    }
                    else {
                        vm.$router.push('/login');
                    }
                });
            });
        }
    };
</script>


<style scoped="">
    .container {
        max-width: 1170px;
        margin: auto;
    }

    img {
        max-width: 100%;
    }

    .inbox_people {
        background: #f8f8f8 none repeat scroll 0 0;
        float: left;
        overflow: hidden;
        width: 40%;
        border-right: 1px solid #c4c4c4;
    }

    .inbox_msg {
        border: 1px solid #c4c4c4;
        clear: both;
        overflow: hidden;
    }

    .top_spac {
        margin: 20px 0 0;
    }


    .recent_heading {
        float: left;
        width: 40%;
    }

    .srch_bar {
        display: inline-block;
        text-align: right;
        width: 60%;
    }

    .headind_srch {
        padding: 10px 29px 10px 20px;
        overflow: hidden;
        border-bottom: 1px solid #c4c4c4;
    }

    .recent_heading h4 {
        color: #05728f;
        font-size: 21px;
        margin: auto;
    }

    .srch_bar input {
        border: 1px solid #cdcdcd;
        border-width: 0 0 1px 0;
        width: 80%;
        padding: 2px 0 4px 6px;
        background: none;
    }

    .srch_bar .input-group-addon button {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        padding: 0;
        color: #707070;
        font-size: 18px;
    }

    .srch_bar .input-group-addon {
        margin: 0 0 0 -27px;
    }

    .chat_ib h5 {
        font-size: 15px;
        color: #464646;
        margin: 0 0 8px 0;
    }

    .chat_ib h5 span {
        font-size: 13px;
        float: right;
    }

    .chat_ib p {
        font-size: 14px;
        color: #989898;
        margin: auto
    }

    .chat_img {
        float: left;
        width: 11%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }

    .chat_img img {
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }

    .chat_ib {
        float: left;
        padding: 0 0 0 15px;
        width: 88%;
    }

    .chat_people {
        overflow: hidden;
        clear: both;
    }

    .chat_list {
        border-bottom: 1px solid #c4c4c4;
        margin: 0;
        padding: 18px 16px 10px;
    }

    .inbox_chat {
        height: 550px;
        overflow-y: scroll;
    }

    .active_chat {
        background: #ebebeb;
    }

    .received_msg {
        padding: 0 0 0 10px;
        float: left;
        vertical-align: top;
        width: 100%;
    }

    .received_withd_msg p {
        background: #ebebeb none repeat scroll 0 0;
        border-radius: 3px;
        color: #646464;
        font-size: 14px;
        margin: 0;
        padding: 5px 10px 5px 12px;
        width: 51%;
    }

    .time_date {
        color: #747474;
        display: block;
        font-size: 12px;
        align-self: auto;
        margin: 8px 0 0;
        width: auto;
    }

    .received_msg span {
        display: block;
        position: relative;
        left: -25%;
        align-self: center;
    }

    .received_withd_msg {
        width: 100%;
    }

    .mesgs {
        padding: 30px 15px 0 25px;
        width: 100%;
        word-wrap: normal;
    }

    .sent_msg p {
        background: #05728f none repeat scroll 0 0;
        border-radius: 3px;
        font-size: 14px;
        margin: 0;
        color: #fff;
        width: auto;
    }

    .sent_msg {
        float: right;
        width: 51%;
        margin: auto 0;
        padding-right: 0;
    }

    .input_msg_write input {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        color: #4c4c4c;
        font-size: 15px;
        min-height: 48px;
        width: 80%;
    }

    .type_msg {
        border-top: 1px solid #c4c4c4;
        float: right;
        width: 60%;
    }

    .msg_send_btn {
        background: #05728f none repeat scroll 0 0;
        border: medium none;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        height: 33px;
        width: 33px;
    }

    .msg_history {
        height: 516px;
        overflow-y: auto;
    }

    .write_msg {
        width: 10%;
        padding: 0px;
    }
</style>
