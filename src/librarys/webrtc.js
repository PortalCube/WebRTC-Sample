import { Peer } from "peerjs";

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export class RTCPeer {
    instance = null;
    id = null;
    dataConnection = null;
    mediaConnection = null;
    clientStream = null;
    remoteStream = null;

    constructor() {}

    start(stream) {
        this.clientStream = stream;

        // if (this.instance && this.instance.disconnected) {
        //     this.instance.reconnect();
        //     return;
        // }

        this.instance = new Peer({});
        this.instance.on("open", (id) => {
            this.id = id;
            this.log("Client ID:", id);
            this.onOpen(id);
        });
        this.instance.on("error", (error) => {
            this.logError(error);
            this.onError(error);
        });
        this.instance.on("connection", (connection) => {
            // dataConnection
            this.setDataConnection(connection);
        });
        this.instance.on("call", (connection) => {
            // mediaConnection
            this.setMediaConnection(connection);
        });
    }

    disconnect() {
        this.log("Disconnecting...");
        if (this.mediaConnection) {
            this.mediaConnection.close();
            this.mediaConnection = null;
        }

        if (this.dataConnection) {
            this.dataConnection.close();
            this.dataConnection = null;
        }

        // if (this.instance) {
        //     this.instance.disconnect();
        //     this.log("Complete?", this.instance.disconnected);
        // }
    }

    log(...arg) {
        console.log("[RTCPeer]", ...arg);
    }

    logError(...arg) {
        console.error("[RTCPeer]", ...arg);
    }

    onOpen(id) {}

    onError(error) {}

    onConnection(connection) {}

    onCall(connection) {}

    onData(data) {}

    onStream(stream) {}

    onDataClose() {}

    onMediaClose() {}

    setDataConnection(connection) {
        if (this.dataConnection) {
            this.dataConnection.close();
        }

        this.dataConnection = connection;
        this.dataConnection.on("data", (data) => {
            this.log("Recevied data", data);
            this.onData(data);
        });
        this.dataConnection.on("close", () => {
            this.dataConnection = null;
            this.onDataClose();
        });
        this.dataConnection.send("id=" + this.id);
        this.onConnection(this.dataConnection);
    }

    setMediaConnection(connection) {
        if (this.mediaConnection) {
            this.mediaConnection.close();
        }

        this.mediaConnection = connection;
        this.mediaConnection.on("stream", (stream) => {
            this.onStream(stream);
        });
        this.mediaConnection.on("close", () => {
            this.mediaConnection = null;
            this.onMediaClose();
        });
        this.mediaConnection.answer(this.clientStream);
        this.onCall(this.mediaConnection);
    }

    connect(id) {
        if (this.dataConnection != null) {
            return; // 상대방이 먼저 접속하여 연결 완료
        }

        const connection = this.instance.connect(id);

        connection.on("open", () => {
            this.setDataConnection(connection);
            this.call(id);
        });
    }

    call(id) {
        if (this.mediaConnection != null) {
            return; // 상대방이 먼저 접속하여 연결 완료
        }

        const connection = this.instance.call(id, this.clientStream);

        this.setMediaConnection(connection);
    }
}

// export class RTCConnection {
//     instance = null;

//     constructor(connection) {
//         this.instance = connection;
//         this.instance.on("open", this.onOpen);
//         this.instance.on("close", this.onClose);
//         this.instance.on("error", this.onError);
//     }

//     log(...arg) {
//         console.log("[RTCConnection]", ...arg);
//     }

//     logError(...arg) {
//         console.error("[RTCConnection]", ...arg);
//     }

//     close() {
//         this.instance.close();
//     }

//     onOpen() {
//         this.log("Connection established", connection);
//     }

//     onClose() {
//         this.log("Connection closed", connection);
//     }

//     onError(err) {
//         this.logError(err);
//     }
// }

// export class RTCDataConnection extends RTCConnection {
//     constructor(connection) {
//         super(connection);
//         this.instance.on("data", this.onData);
//     }

//     onData(data) {
//         data;
//     }
// }

// export class RTCMediaConnection extends RTCConnection {
//     constructor(connection) {
//         super(connection);
//         this.instance.on("stream", this.onStream);
//     }

//     onStream(stream) {
//         stream;
//     }
// }
