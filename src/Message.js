import './Message.css';
import React from 'react';

const formatDate = (timestamp) => {
  let date = new Date(timestamp);
  let dateNow = new Date();
  if(date.getDate() == dateNow.getDate() && date.getMonth() == dateNow.getMonth() && date.getFullYear() === dateNow.getFullYear()){
    return 'Today ' + date.toTimeString();
  }
  else{
    return (new Date(timestamp)).toLocaleString();
  }
};

export default class Message extends React.Component {
  render() {
    var renderedDate = formatDate(this.props.value.timestamp);

    return (
      <div className="Message">
        <div>
          <div className="authorIcon">
            {this.props.value.author[0].toUpperCase()}
          </div>
          <span className="Message-author">{this.props.value.author}</span>
          <span className="Message-timestamp">
            {renderedDate}
          </span>
        </div>
        <hr />
        <div className="Message-contents">{this.props.value.contents}</div>
      </div>
    );
  }
}
