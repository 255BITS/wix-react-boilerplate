require('styles/Settings.styl');

import WixReact from '../wixReact.jsx';
import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <Settings/>
    );
  }
}

AppComponent.defaultProps = {
};

class Settings extends React.Component {
  constructor(args) {
    super(args);
  }
  upgrade() {
    Wix.Settings.openBillingPage();
  }
  render() {
    return (
      <div>
        <header className="intro box">
          <div className="description">
            DESCRIBE_APP_HERE
          </div>
          <div className="header-buttons">
            <button className="btn-upgrade" onClick={this.upgrade}>Upgrade Now</button>
          </div>
        </header>
        <div id="error" style={{display: 'none'}}></div>

        <WixReact.Tabs>
          <WixReact.Tab title='Content'>
            Tab 1
          </WixReact.Tab>

          <WixReact.Tab title='Results'>
            Tab 2
          </WixReact.Tab>

          <WixReact.Tab title='Design'>
            <DesignTab />
          </WixReact.Tab>
        </WixReact.Tabs>
      </div>
    );
  }
  componentDidMount() {
  }
};

class DesignTab extends React.Component {
  render() {
    return <div> 

            <div className='settings-section design'>
              <div className='wix-label-label'>Fonts</div>
              <div className='indent'>
                <WixReact.Label label="Body font">
                  <WixReact.FontPicker param="font" default='Body-M'/>
                </WixReact.Label>
                <WixReact.Label label="Label font">
                  <WixReact.FontPicker param="headerFont" default='Heading-M'/>
                </WixReact.Label>
                <WixReact.Label label="Button font">
                  <WixReact.FontPicker param="buttonFont" default='Heading-S'/>
                </WixReact.Label>
              </div>
            </div>
            <div className='settings-section design'>
              <div className='wix-label-label'>Colors</div>
              <div className='indent'>
                <WixReact.Label label="Background">
                  <WixReact.ColorPickerWithOpacity param="bgColor" default='color-1'/>
                </WixReact.Label>
                <WixReact.Label label="Foreground">
                  <WixReact.ColorPicker param="fgColor" default='color-5'/>
                </WixReact.Label>
                <WixReact.Label label="Button background">
                  <WixReact.ColorPicker param="buttonColor" default='color-8'/>
                </WixReact.Label>
                <WixReact.Label label="Button hover">
                  <WixReact.ColorPicker param="buttonHoverColor" default='color-7'/>
                </WixReact.Label>
                <WixReact.Label label="Button text">
                  <WixReact.ColorPicker param="buttonTextColor" default='color-1'/>
                </WixReact.Label>

              </div>
            </div>
           </div>;
  }
};

export default AppComponent;
