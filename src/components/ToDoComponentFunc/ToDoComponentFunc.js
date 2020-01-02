import React, {useState, useEffect} from 'react';
import './ToDoComponentFunc.scss'

function ToDoComponentFunc() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState('');
  const [occupation, setOccupation] = useState('');
  const [blockClass, setBlockClass] = useState('ErrorBlockNo');
  const [id, setId] = useState(0);
  const [items, setItems] = useState([]);

  function onChangeHumanName(event) {
    setName(event.target.value);
    console.log(name);
  }

  function onChangeAge(event) {
    setAge(event.target.value);
  }

  useEffect(() => {
    const ageArrCheck = [];
    for(let i = 0; i < age.length; i++) {
      if(isNaN(parseInt(age[i]))) {
        ageArrCheck.push(age[i]);
      }
    }
    if(ageArrCheck.length > 0) {
      setAgeError('Only numbers!');
      setBlockClass('ErrorBlock');
    } else {
      setAgeError('');
      setBlockClass('ErrorBlockNo');
    }
  }, [age]);


  function onChangeOccupation(event) {
    setOccupation(event.target.value);
  }

  function addItem(event) {
    event.preventDefault();
    setId(id + 1);
    items.push({
      name: name,
      age: age,
      occupation: occupation,
      id: id
    });
    document.querySelector('#name').value = '';
    document.querySelector('#age').value = '';
    document.querySelector('#occupation').value = '';
    setName('');
    setAge('');
    setOccupation('');
  }

  function delItem(index, event) {
    event.preventDefault();
    const itemsArr = Object.assign([], items);
    itemsArr.splice(index, 1);
    setItems(itemsArr);
    console.log(itemsArr);
  }

  return (
    <div className="wrapper">
      <div className="topBlock">
        <form className="form">
          <input type="text" name="name" id="name" className="form-input" value={name} placeholder={'Name'} onChange={onChangeHumanName} required />
          <input type="text" name="age" id="age" className="form-input" value={age} placeholder={'Age'} onChange={onChangeAge} required />
          { ageError !== '' && <span>{ageError}</span> }
          <input type="text" name="occupation" id="occupation" className="form-input" value={occupation} placeholder={'Occupation'} onChange={onChangeOccupation} required />
          <div className={blockClass}></div>
          <input type="submit" name="submit" id="submit" className={'form-btn'} value={'Add item'} onClick={addItem}/>
        </form>
        <p className="topBlock-text">Mouse Right Click - delete item</p>
      </div>
      <div className="items">
        { items.map( (item, index) => <div className="item" key={index} onContextMenu={delItem.bind(this, index)}>
          <h3 className={'item-title'}>{ item.name.length < 1 ? 'Name' : item.name }</h3>
          <p className={'item-age'}>{ item.age.length < 1 ? 0 : item.age }</p>
          <p className={'item-occupation'}>{ item.occupation.length < 1 ? 'Occupation' : item.occupation }</p>
        </div> ) }
      </div>
    </div>
  );
}

export default ToDoComponentFunc;