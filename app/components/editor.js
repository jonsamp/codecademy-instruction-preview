require('./prism/prism.css');
require('./prism/prism.js');
import React from 'react';
import MTRC from 'markdown-to-react-components';

const Editor = React.createClass({
  getInitialState() {
    return {
      content: null, wordCount: 0,
      characterCount: 0,
      exerciseLength: "--"
    };
  },
  determinExerciseLength(wordCount) {
    if (wordCount < 20) {
      return "Short";
    } else if (wordCount < 80) {
      return "Medium - Short";
    } else if (wordCount < 160) {
      return "Medium";
    } else if (wordCount < 240) {
      return "Medium - Long";
    } else if (wordCount < 300) {
      return "Long";
    } else if (wordCount > 300) {
      return "Very Long";
    }
  },
  onTextareaChange(event) {
    let currentWordCount = event.target.value.length === 0
      ? 0
      : event.target.value.trim().split(' ').length;
    this.setState({
      content: MTRC(event.target.value).tree,
      wordCount: currentWordCount,
      characterCount: event.target.value.length,
      exerciseLength: this.determinExerciseLength(currentWordCount)
    });
  },
  render() {
    return (
      <div className="md-panes">

        <div className="instructions">
          <div className="learn-header">Learn</div>
          <div className="markdown-output">
            {this.state.content}
          </div>
        </div>

        <textarea onChange={this.onTextareaChange}/>

        <div className="text-analysis">
          <div className="title">Character Count</div>
          <div className="value">{this.state.characterCount}</div>
          <div className="title">Word Count</div>
          <div className="value">{this.state.wordCount}</div>
          <div className="title">Length</div>
          <div className="value">{this.state.exerciseLength}</div>
        </div>
      </div>
    );
  }
});

export default Editor;
