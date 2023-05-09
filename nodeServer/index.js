const io=require('socket.io')(8000);

const users={}

io.on('connection',socket=>{
    //socket .on means agr ye event milta h server ko to ye call back run karo
    socket.on('new-user-joined',name=>{
        // console.log('new user ',name);
        users[socket.id]=name;
        //jisne join kiya usko chor kar baki sab ko inform kar do
        socket.broadcast.emit('user-joined',name)
    });

    //if someone sends a msg ,broadcast it to other paople
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    });

    //if someone leaves the chat,let others know
//discconnect pre-built event h jo khud fire hota h user ke levae  karne par
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id])
        delete users[socket.id]
    })
})