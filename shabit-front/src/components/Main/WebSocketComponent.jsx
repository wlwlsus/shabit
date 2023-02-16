import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import apiRequest from '../../utils/apiRequest';

class WebSocketComponent extends React.Component {
  constructor(props) {
    super(props);
    this.url = `${apiRequest.defaults.baseURL}/ws`;
    this.HEARTBEAT_INTERVAL = 1000; // 핑 메시지 전송 간격 (3초)
    this.connected = false; // 연결 상태
    this.stompClient = null; // 웹소켓 객체
    this.pingTimer = null; // 핑 전송 타이머
    this.message = {
      email: '',
      refreshToken: '',
    };
  }

  connect = async (email, token) => {
    this.message.email = email;
    this.message.refreshToken = token;

    const socket = new SockJS(this.url);
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => {};

    return new Promise((resolve, reject) => {
      this.stompClient.connect(
        {},
        () => {
          this.connected = true;
          this.stompClient.subscribe('/topic/pong', (message) => {
            // console.log('pong');
          });

          this.stompClient.subscribe('/topic/disconnect', (message) => {
            // console.log('disconnect');
          });

          this.stompClient.ws.onclose = () => {
            // console.log('연결 끊김 Callback');
            this.connected = false;
          };
          resolve(this.stompClient);
        },

        (error) => {
          reject(error);
        },
      );
    });
  };

  disconnect = () => {
    // console.log('Disconnected');
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      this.connected = false;
    }
  };

  ping = () => {
    this.stompClient.send('/app/ping', {}, JSON.stringify(this.message));
  };

  startHeartbeat = () => {
    this.pingTimer = setInterval(() => {
      this.ping();
    }, this.HEARTBEAT_INTERVAL);
  };

  stopHeartbeat = () => {
    // console.log(this.message);
    this.stompClient.send('/app/disconnect', {}, JSON.stringify(this.message));
    clearInterval(this.pingTimer);
    this.disconnect();
  };

  asyncConnect = async (email, token) => {
    if (this.connected === false) await this.connect(email, token);
  };

  checkDuplicated = async () => {
    return new Promise((resolve, reject) => {
      this.stompClient.send('/app/check', {}, JSON.stringify(this.message));
      this.stompClient.subscribe('/topic/check', (message) => {
        resolve(message.body);
      });
    });
  };
}

export default WebSocketComponent;
