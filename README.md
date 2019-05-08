# Node.js Socket Server
This socket server has been built on node.js with Express, with motive to replace ‘pusher’ for real time notifications.


## Requirements:
- Node.js: https://nodejs.org/en/download/
- npm: (Node Package Manager): Latest Node.js includes npm
	OR
  yarn: https://yarnpkg.com/en/docs/install


## Initial Setup:
- Install requirements
```
$ npm install
OR
$ yarn
```

## Run server:
Using the following command will run the socket server in `http://localhost:3000`.
```
$ npm run start
OR
$ yarn start
```


## Namespaces:
Three namespaces have been created so that irrelevant data aren’t sent to any apps.

### - /web-app
The frontend application connects to this namespaces`http://localhost:3000/web-app`.
```
const io = require("socket.io-client");
let socket = io.connect("http://localhost:3000/web-app");
```

### - /ios-app
The ios apps connects to this namespace.

### - /android-app
The ios apps connects to this namespace.


## Join Room:
The userId can be used as room.

socket-client:
```
socket.emit("joinRoom", room);
```


### Rejoin after server disconnection
```
socket.on("disconnect", () => {
    console.log("Server disconnected.");
    socket.emit("joinRoom", room);
});
```


## Integration with backend:
The backend server can communicate with this socket server via API.

### - /api/notification: POST request method
- This API emits the request payload data, to the room and on event name included in the request data, to all three namespaces.
```
URL: http://localhost:3000/api/notification
Request payload:
{
‘channel’: `Room`,
‘event’: `Event Name`,
‘data’: `Message to emit <string/array/dictionary>`
}
```

### - /api/mobile-info: POST request method
- This API emits the request payload data, to the room and on event name included in the request data, to either ‘/android-app’  or ‘/ios-app’ or both namespaces.
- Examples: mobile app version update

```
URL: http://localhost:3000/api/mobile-info
Request payload:
{
‘channel’: `Room`,
‘event’: `Event Name`,
‘data’: `Message to emit <string/array/dictionary>`
}
```
