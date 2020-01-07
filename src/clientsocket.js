import socketIOClient from "socket.io-client";

class SocketHandler {
    constructor() {
        this.socket = socketIOClient('localhost:5000/');
        this.setFunc = () => {};

        console.log('socket on')
        for(let i=1; i<7; i++) {
            this.socket.on(`court${i}`, players => {
                if(i===this.courtNum) {
                    this.setFunc([...players]);
                }
            });
        }
    }

    changeDisplay(courtNum, setPlayers) {
        this.courtNum = courtNum;
        this.setFunc = setPlayers;
    }

}

export const socketHandler = new SocketHandler();
