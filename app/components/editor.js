require('./prism/prism.css');
require('./prism/prism.js');
import React from 'react';
import MTRC from 'markdown-to-react-components';

const Editor = React.createClass({
  getInitialState() {
    return {
      content: null, wordCount: 0,
      characterCount: 0,
      exerciseLength: "--",
      readTime: "--"
    };
  },
  determinExerciseLength(wordCount) {
    if (wordCount < 20) {
      return "Short";
    } else if (wordCount < 80) {
      return "Short - Average";
    } else if (wordCount < 160) {
      return "Average";
    } else if (wordCount < 240) {
      return "Average - Long";
    } else if (wordCount < 300) {
      return "Long";
    } else if (wordCount > 300) {
      return "Very Long";
    }
  },
  calculateReadTime(wordCount) {

    // Average reading time is 200wpm
    // Since learners are reading code and having to look back at text, the reading time will likely be slower.
    let minutes = Math.floor(wordCount/165);
    let seconds = Math.round(((wordCount/165) - minutes) * 60);
    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
  },
  onTextareaChange(event) {
    let currentWordCount = event.target.value.length === 0
      ? 0
      : event.target.value.trim().split(' ').length;
    this.setState({
      content: MTRC(event.target.value).tree,
      wordCount: currentWordCount,
      characterCount: event.target.value.length,
      exerciseLength: this.determinExerciseLength(currentWordCount),
      readTime: this.calculateReadTime(currentWordCount)
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
          <div className="title">Reading Time</div>
          <div className="value">{this.state.readTime}</div>
          <div className="title">Length</div>
          <div className="value">{this.state.exerciseLength}</div>
        </div>
      </div>
    );
  }
});

export default Editor;
