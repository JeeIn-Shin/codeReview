const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('port', process.env.PORT || 8080);

//이거 전체 코드를 보니까, 커다란 방 하나에 사람들이 계속 추가추가추가추가되면서 채팅을 할 수 있는 구조임
//근데 나는 매칭된 두 사람에게 방을 지정해주고, 그 방에서 채팅을 하길 원함
//이렇게 할려면 채팅방 코드를 생성하는 부분이 필요함

//그리고 이건 채팅방 하나에서 이뤄지는 행위들이라고 생각하면 좋을거 같음
//그렇다면 음..........
//이건 이렇게 파일을 생성해두고,
//router에서는
//채팅을 보낼 때 DB에 저장하고*******************
//채팅방을 나갈 때 soft delete
//이런 식으로 가야할 거 같은데

//채팅을 보낸다는 행위를 어떻게 알게끔하지?
//그냥 여기서 바로 query를 해버려? 그럼 안되는데
//어떻게 분리를 하는게 좋을까?
io.on('connection', (socket) => {


    // when the client emits 'new message', this listens and executes
    // 그리고 이 보낸 메세지를 DB에 저장해야함
    // 그럼 이 DB에 저장되는 행동은 어디에서 발생해야하는가? 인건데.
    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });

        //breaodcast 이거 전체로 보내는거니까
        //to
        socket.broadcast.emit()
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        //1 : n, 그리고 채팅방 1개의 상황이 아님
        //이를 어떻게 바꿔줘야할까?
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});


// 이렇게 보내는걸로 연결이 되나?
module.exports = io;