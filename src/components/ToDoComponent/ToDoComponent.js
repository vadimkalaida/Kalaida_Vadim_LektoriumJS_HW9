import React, {Component} from 'react'
import ReactDOM from "react-dom"
import UniqueId from 'react-html-id'
import './ToDoComponent.scss'

export default class ToDoComponent extends Component {
  constructor(props) {
    super(props);
    UniqueId.enableUniqueIds(this);
    this.state = {
      name : 'Name',
      nameError : '',
      age : 0,
      ageError : '',
      occupation : 'Occupation',
      occupationError : '',
      blockClass : 'ErrorBlockNo',
      id : this.nextUniqueId(),
      items : []
    };

    this.onChangeHumanName = this.onChangeHumanName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeOccupation = this.onChangeOccupation.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  onChangeHumanName(event) {
    this.setState({
      name : event.target.value
    });
  }

  onChangeAge(event) {
    this.setState({
      age : event.target.value
    });
    if(isNaN(parseInt(this.state.age))) {
      this.setState({
        ageError : 'Only numbers!',
        blockClass : 'ErrorBlock'
      });
    } else {
      this.setState({
        ageError : '',
        blockClass : 'ErrorBlockNo'
      });
    }
  }

  onChangeOccupation(event) {
    this.setState({
      occupation : event.target.value
    });
  }

  addItem(event) {
    const node = ReactDOM.findDOMNode(this);
    event.preventDefault();
    this.setState({
      id : this.state.id + 1
    });
    this.state.items.push({
      name : this.state.name,
      age : this.state.age,
      occupation : this.state.occupation,
      id : this.state.id
    });
    node.querySelector('#name').value = '';
    node.querySelector('#age').value = '';
    node.querySelector('#occupation').value = '';
    console.log(this.state.items)
  }

  delItem(index, event) {
    event.preventDefault();
    const items = Object.assign([], this.state.items);
    items.splice(index, 1);
    this.setState({
      items : items
    });
  }

  editItem(index, event) {

  }

  render() {
    const {nameError, ageError, occupationError} = this.state;
    return (
      <div className="wrapper">
        <div className="topBlock">
          <form className="form">
            <input type="text" name="name" id="name" className="form-input" placeholder={'Name'} onChange={this.onChangeHumanName} required />
            { nameError !== '' && <span>{nameError}</span> }
            <input type="text" name="age" id="age" className="form-input" placeholder={'Age'} onChange={this.onChangeAge} required />
            { ageError !== '' && <span>{ageError}</span> }
            <input type="text" name="occupation" id="occupation" className="form-input" placeholder={'Occupation'} onChange={this.onChangeOccupation} required />
            { occupationError !== '' && <span>{occupationError}</span> }
            <div className={this.state.blockClass}></div>
            <input type="submit" name="submit" id="submit" className={'form-btn'} value={'Add item'} onClick={this.addItem}/>
          </form>
          <p className="topBlock-text">Mouse Right Click - delete item</p>
        </div>
        <div className="items">
          { this.state.items.map( (item, index) => <div className="item" key={index} onClick={this.editItem.bind(this, index)} onContextMenu={this.delItem.bind(this, index)}>
            <h3 className={'item-title'}>{ item.name }</h3>
            <p className={'item-age'}>{ item.age }</p>
            <p className={'item-occupation'}>{ item.occupation }</p>
          </div> ) }
        </div>
      </div>
    );
  }
}