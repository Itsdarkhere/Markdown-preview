import React from 'react'
import './App.css';
import marked from 'marked'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'



export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: '# Sample Markdown Heading\n\n## Heading 2 \n\n Text attributes *italic*, **bold**,\n`monospace`, ~~strikethrough~~ .\n\nUnordered list:\n\n  - apples\n  - oranges\n  - pears\n\n There\'s also [links](https://www.freecodecamp.com), and \n> Block Quotes!\n\n ![React Logo w/ Text](https://picsum.photos/200)\n\n```\nfunction test() {\nconsole.log("notice the blank line before this function?");\n}\n```'
    } 
  }

  //passes the value of editor to the parent elements function that changes state
  sendHtml = (e) => {
    this.props.func(e.target.value);
  }
  
  //send default value to preview div when component mounts
  componentDidMount() { 
    const element = document.getElementById('editor');
    this.props.func(element.value);
  }
  
  render() {

    return (
      <div id="editor-container">
        <FontAwesomeIcon icon={faExpandArrowsAlt} id="editor-expand"/>
        <textarea id="editor" onChange={this.sendHtml} defaultValue={this.state.startValue}></textarea>
      </div>
    )
  }

}
export class Preview extends React.Component {
  constructor(props) {
    super(props);
    
  }
  componentDidUpdate() {
    
    //insert the html into the preview div  
    const element = document.getElementById('preview');

    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });
    element.innerHTML = marked(this.props.text);
  }
  
  render() {
    
    return (
      <div id="preview-container">
        <FontAwesomeIcon icon={faExpandArrowsAlt} id="preview-expand"/>
        <div id="preview" contentEditable="true"></div>
      </div>
    )
  }
}

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  //this func is passed to editor
  passText = (html) => {
    this.setState({
      text: html
    })
  }

  render() {
    return (
      <div className="Container">
        <Editor func={this.passText}/>
        <Preview text={this.state.text}/>
      </div>
    );
  }
}
export default App;
