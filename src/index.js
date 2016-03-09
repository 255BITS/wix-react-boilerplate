import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import SettingsApp from './components/Settings';
import WidgetApp from './components/Widget';

// Render the main component into the dom
var sockjs_url = '/changes';
window.sockjs = new SockJS(sockjs_url);
if(document.getElementById('settings-content')) {
  ReactDOM.render(<SettingsApp/>, document.getElementById('settings-content'));
}
if(document.getElementById('widget-content')) {
  ReactDOM.render(<WidgetApp sockjs={window.sockjs}/>, document.getElementById('widget-content'));
}
Actions.registerSockJs();
