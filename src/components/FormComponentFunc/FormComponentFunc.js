import React, {useState} from 'react'
import validator from 'validator'
import passwordValidator from 'password-validator'
import './FormComponentFunc.scss'

function FormComponentFunc() {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const informationArr = [];

  function onChangeUsername(event) {
    const eng = /^[A-Za-z0-9]*$/;
    setUsername(event.target.value);
    if(username.length < 3 || username.length > 15){
      setUsernameError('Username length should be 4 - 16');
    } else if(!eng.test(username)) {
      setUsernameError('only ENGLISH');
    } else {
      setUsernameError('');
    }
  }

  function onChangeEmail(event) {
    setEmail(event.target.value);
    if(validator.isEmail(email)) {
      setEmailError('');
    } else {
      setEmailError('Email should looks like "example1@gmail.com"');
    }
  }

  function onChangePhone(event) {
    setPhone(event.target.value);
    if(validator.isMobilePhone(phone)) {
      setPhoneError('');
    } else {
      setPhoneError('Phone NUMBER should looks like "+380112881884" without plus');
    }
  }

  function onChangePassword(event) {
    let passValOptions = new passwordValidator();
    passValOptions.is().min(8);
    passValOptions.is().max(18);
    passValOptions.has().uppercase();
    passValOptions.has().lowercase();
    passValOptions.has().not().spaces();
    setPassword(event.target.value);
    if(passValOptions.validate(password)) {
      setPasswordError('');
    } else {
      setPasswordError('Password length should be 8 - 18, has uppercase and lowercase letters and does not have spaces');
    }
  }

  function onChangePasswordConfirm(event) {
    setPasswordConfirm(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    if(username === '') {
      setUsernameError('Username should be on ENGLISH and not empty');
    } else if(username !== '') {
      setUsernameError('');
    }

    if(email === '') {
      setEmailError('Email should be on ENGLISH and not empty');
    } else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setEmailError('This input should look like "something1@gmail.com"');
    } else if(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setEmailError('');
    }

    if(password === '') {
      setPasswordError('Password should be on ENGLISH and not empty');
    } else if(password !== '') {
      setPasswordError('');
    }

    if(passwordConfirm === '') {
      setPasswordConfirmError('Please confirm your password');
    } else if(passwordConfirm !== password) {
      setPasswordConfirmError('Passwords should be identical');
    } else if(passwordConfirm === password) {
      setPasswordConfirmError('');
    }

    informationArr.push({
      username : username,
      email : email,
      phone : phone,
      password : password
    });
    setUsername('');
    setEmail('');
    setPhone('');
    setPassword('');
    setPasswordConfirm('');
    localStorage.setItem('user', JSON.stringify(informationArr));
    console.log(informationArr);
  }

  return(
    <div className={'ContentForm'}>
      <form>
        <input type="text" name="username" id="username" value={username} placeholder={'*Username'} className={'ContentForm-input'} onChange={onChangeUsername} />
        { usernameError !== '' && <span>{usernameError}</span> }
        <input type="text" name="email" id="email" placeholder={'*Email'} value={email} className={'ContentForm-input'} onChange={onChangeEmail} />
        { emailError !== '' && <span>{emailError}</span> }
        <input type="text" name="phone" id="phone" placeholder={'Phone Number'} value={phone} className={'ContentForm-input'} onChange={onChangePhone} />
        { phoneError !== '' && <span>{phoneError}</span> }
        <input type="password" name="password" id="password" placeholder={'*Password'} value={password} className={'ContentForm-input'} onChange={onChangePassword} />
        { passwordError !== '' && <span>{passwordError}</span> }
        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder={'*Confirm Password'} value={passwordConfirm} onChange={onChangePasswordConfirm} className={'ContentForm-input'} />
        { passwordConfirmError !== '' && <span>{passwordConfirmError}</span> }
        <button id="submitBtn" className={'ContentForm-btn'} onClick={onSubmit}>Signup</button>
      </form>
    </div>
  );
}

export default FormComponentFunc;