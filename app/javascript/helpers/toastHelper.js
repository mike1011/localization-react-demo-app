import React from 'react';

export function returnToastMarkup(data) {
  return (
    <div className={`notify notify-top-right ${alertClass(data.type)}`} style={{Top: 20}}>
      <div className="notify-icon">
          <div className="notify-icon-inner" style={{ marginTop: -9}}>
              {alertIcons(data.type)}
          </div>
      </div>
      <div className="notify-text">
          <h3>{data.title}</h3>
          <p>{data.message}</p>
      </div>
    </div>
  )
}


export default { returnToastMarkup }
