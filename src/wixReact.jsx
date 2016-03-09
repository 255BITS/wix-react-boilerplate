var React = require('react');

var exports = React.createClass({
  render: function() {
    return <div/>;
  }
});

exports.AccordionOption = React.createClass({
  render: function() {
    return (
      <div className="acc-pane" id={this.props.id}>
        <h3>{this.props.title}</h3>
        <div className="acc-content">
          <ul className="list">
            {this.props.children}
          </ul>
        </div>
      </div>
    );
  }
});

exports.Accordion = React.createClass({
  render: function() {
    return (
      <div data-wix-ctrl="Accordion">
        {this.props.children}
      </div>
    );
  }
});

var Checkbox= React.createClass({
  getInitialState: function() {
    return {options: "{preLabel: '"+this.props.label+"', checked: " + this.props.value + "}"};
  },
  render: function() {
    return (
        <div {...this.props} data-wix-model={this.props.model} data-wix-ctrl="Checkbox"
            data-wix-options={this.state.options}/>
    );
  }
});

exports.FontPicker = React.createClass({
  getInitialState: function() {
    return {options: "{value: '"+this.props.default+"'}"};
  },

  render: function() {
    return (
      <div name={this.props.model} 
          data-wix-ctrl="FontStylePicker"
          data-wix-options={this.state.options}
          data-wix-param={this.props.param} 
          data-wix-model={this.props.model}
      ></div>
    );
  } 
});

exports.ColorPickerWithOpacity = React.createClass({
  getInitialState: function() {
    return {options: "{startWithColor: '"+this.props.default+"'}"};
  },

  render: function() {
    return (
      <div 
          name={this.props.model} 
           data-wix-model={this.props.model} 
           data-wix-param={this.props.param} 
           data-wix-ctrl="ColorPickerWithOpacity" 
           data-wix-options={this.state.options}
           />
    );
  } 
});


exports.ColorPicker = React.createClass({
  getInitialState: function() {
    return {options: "{startWithColor: '"+this.props.default+"'}"};
  },

  render: function() {
    return (
      <div name={this.props.model} 
           data-wix-param={this.props.param} 
           data-wix-model={this.props.model}
           data-wix-ctrl="ColorPicker" 
           data-wix-options={this.state.options}
           />
    );
  } 
});

exports.Dropdown = React.createClass({
   getInitialState: function() {
    var self=this;
    var options = this.props.options.map(function(option, i) {
      var value=option;
      if(self.props.values) {
        value=self.props.values[i];
      }
      return [value, option];

    });
    return {value:this.props.default, options:options};
  },
  render: function() {
    var wixOptions = JSON.stringify({width: 300});
    return (
      <div 
          data-wix-model={this.props.model} 
          data-wix-ctrl="Dropdown"
          data-value={this.state.value}
          data-wix-options={wixOptions}
      >
        {this.state.options.map(function(option, i) {
          return (<div value={option[0]}>{option[1]}</div>);
        })}
      </div>
    );
  }
 
});

exports.TextInput = React.createClass({
  render: function() {
    return (
        <div 
            name={this.props.model}
            data-wix-model={this.props.model}
            data-wix-ctrl="Input"
            ></div>
    );
  }
});

exports.Label = React.createClass({
  getInitialState: function() {
    return {value:this.props.default};
  },
  render: function() {
    var className = 'wix-label';
    if(this.props.className) {
      className += " " + this.props.className;
    }
    return (
        <div className={className}>
          <label className='wix-label-label'>{this.props.label}</label>
          <div className='wix-label-content'>{this.props.children}</div>
        </div>
    );
  }
});

exports.Slider = React.createClass({
  getInitialState: function() {
    return {value:this.props.default};
  },
  render: function() {
    var max = this.props.max;
    var min;
    if(this.props.min === undefined) {
      min = 0;
    } else {
      min = this.props.min;
    }
    var options = "{ maxValue:"+max+", preLabel:"+min+", postLabel:'"+max+"'}";
    return (
      <div data-wix-ctrl="Slider" 
           data-wix-options={options}
           name={this.props.model}
           data-wix-model={this.props.model}
           data-wix-param={this.props.param}
           value={this.state.value}
          ></div>
    );
  }
})

exports.Tabs = React.createClass({
  render: function() {
    var children = this.props.children;
    var tabHeaders = [];
    for(var child of children) {
      var title= child.props.title;
      tabHeaders.push(<li data-tab={title}><div>{title}</div></li>);
    }
    return (
      <div data-wix-options="{value:0}" data-wix-ctrl='Tabs' id={this.props.id}>
        <ul>
          {tabHeaders}
        </ul>
        <div className="tab-content">
          {this.props.children}
        </div>
      </div>
    );
  }

});

exports.Tab = React.createClass({
  render: function() {
    return (
      <div data-tab={this.props.title} className="tab-pane">
        {this.props.children}
      </div>
    );
  }

});

exports.LayoutSelector = React.createClass({
  click: function(layout) {
    return function() {
      this.setState({active: layout.caption});
      Wix.UI.set(this.props.model, layout.caption);
    }.bind(this);
  },
  getInitialState: function() {
    return {
      active:null
    }
  },
  componentDidMount: function() {
    var active = this.props.active;
    this.setState({active:active});
  },
  render: function() {
    var layoutOptions = [];
    _.each(this.props.layouts, (layout, title) => {
      layoutOptions.push(this.renderLayoutOption(layout));
    });
    return (
      <div {...this.props}>
        <div data-wix-ctrl="Input" data-wix-model={this.props.model} className='wix-layout-selector' style={{display: 'none'}}>
        </div>
        {layoutOptions}
      </div>
    );
  },
  renderLayoutOption: function(layout) {
    var classes='wix-layout-option '+((this.state.active == layout.caption)? 'active' : '');
    return (
      <figure className={classes} onClick={this.click(layout)}>
        <img src={layout.image}/>
        <figcaption>{layout.caption}</figcaption>
      </figure>
    );
  }
});

module.exports = exports;
