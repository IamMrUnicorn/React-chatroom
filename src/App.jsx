import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { Events } from './components/Events';
import { Form } from './components/Form';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [MessageEvents, setMessageEvents] = useState([]);
  const [Users, setUsers] = useState([])

  useEffect(() => {
    function onConnect() {
      const username = prompt("please enter a username", 'anonymous')
      socket.emit('username', username)
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageEvent(value) {
      setMessageEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('Message', onMessageEvent);
    socket.on('Messages', (msgs) => {
      setMessageEvents(msgs)
    })
    socket.on('users', (users) => {
      setUsers(users)
    })

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('Message', onMessageEvent);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={ isConnected } Users={Users}/>
      <Events events={ MessageEvents } />
      <ConnectionManager />
      <Form />
    </div>
  );
}