import socketio

sio = socketio.Client()
sio.connect('http://localhost:8080')

@sio.event
def sendPath(data):
    print('I received a message!')

@sio.event
def connect():
    print("I'm connected!")

@sio.event
def disconnect():
    print("I'm disconnected!")

print(sendPath)
sio.on("sendPath", sendPath)

sio.emit("sendBack", sendPath)
print({"sendBack": sendPath})
