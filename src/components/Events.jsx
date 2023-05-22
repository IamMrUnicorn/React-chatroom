import React from 'react';

export function Events({ events }) {
  return (
    <ul>
      <p>LOOK HERE</p>
    {
      events.map((event, index) =>
        <li key={ index }>{ event }</li>
      )
    }
    </ul>
  );
}