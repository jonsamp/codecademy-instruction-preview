import React from 'react';
import Editor from '../components/editor';
import '../stylesheets/app.scss';

let App = React.createClass({
  render: function () {
    return (
      <Editor />
    );
  }
});

module.exports = App;
