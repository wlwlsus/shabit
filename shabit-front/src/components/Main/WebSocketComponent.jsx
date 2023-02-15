import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import apiRequest from '../../utils/apiRequest';

export const HEARTBEAT_INTERVAL = 3000; // 핑 메시지 전송 간격 (30초)
// export let pingTimer;

class WebSocketComponent extends React.Component {
  constructor(props) {
    super(props);
    this.connected = false;
    this.stompClient = null;
    this.pingTimer = null;
  }

  connect = () => {
    const socket = new SockJS(`${apiRequest.defaults.baseURL}/ws`);
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => {};
    this.stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      this.startHeartbeat();

      this.connected = true;
      console.log('연결 상태 : ', this.connected);
      this.stompClient.subscribe('/topic/pong', (message) => {
        console.log('메시지 수신', message);
      });

      this.stompClient.ws.onclose = () => {
        console.log('연결 끊김 Callback');
        this.connected = false;
      };
    });
  };

  disconnect = () => {
    console.log('Disconnected');
    if (this.stompClient !== null) {
      console.log('연결 종료 !');
      this.stompClient.disconnect();
      this.connected = false;
    }
  };

  ping = () => {
    this.stompClient.send('/app/ping', {}, 'PING!');
  };

  startHeartbeat = () => {
    this.pingTimer = setInterval(() => {
      this.ping();
    }, HEARTBEAT_INTERVAL);
  };

  stopHeartbeat = () => {
    this.stompClient.send('/app/ping', {}, 'Disconnect!!');
    clearInterval(this.pingTimer);
    this.disconnect();
  };
}

export default WebSocketComponent;
