import React from 'react';

export function ConnectionState({ isConnected, Users }) {
  return (
  <>
    <p>{JSON.stringify(Users)}</p>
    <p>State: { '' + isConnected }</p>
  </>
  );
}