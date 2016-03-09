require('styles/Widget.styl');

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <Widget key="widget"/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

class Widget extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className='app'>
    <p>WIDGET_CONTENT</p>
    <button>WIDGET_BUTTON</button>
    </div>;
  }
};

export default AppComponent;
