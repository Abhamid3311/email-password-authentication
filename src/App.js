import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import app from "./firebase.init";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useState } from "react";


const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisteredChange = e => {
    setRegistered(e.target.checked);
  };

  const handleNameBlur = e => {
    setName(e.target.value);
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!');
      })

  }

  const handleFormSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError('password should contain 1 special charectar');
      return;
    }

    setValidated(true);
    setError('');
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          setEmail('');
          setPassword('');
          console.log(user);
        })
        .catch(error => {
          setError(error.message);
          console.error("error", error);
        })
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          setEmail('');
          setPassword('');
          verifyEmail();
          setUserName();
        })
        .catch(error => {
          setError(error.message);
          console.error("error", error);
        })
    }
    e.preventDefault();
  }
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log("updating Name");
      })
      .catch(error => {
        setError(error);
      })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email verification sent!');
      });
  }

  return (
    <div >
      <div className="registration w-50 mx-auto">
        <h2 className="text-primary my-3">Please {registered ? 'Login' : 'Register'} !!!</h2>

        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter name" required />
            <Form.Control.Feedback type="invalid">
              Please choose a name.
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please choose a Email.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please choose a Password.
            </Form.Control.Feedback>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered?" />
            </Form.Group>

          </Form.Group>
          <p className="text-danger">{error}</p>

          <Button variant="primary" type="submit">
            {registered ? 'Log In' : 'Register'}
          </Button> <br />
          <Button onClick={handlePasswordReset} variant="link">Forget password?</Button>
        </Form>
      </div>



















      {/* <form onSubmit={handleFormSubmit}>
        <input onBlur={handleEmailBlur} type="email" name="" id="" /> <br />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" />
        <br />
        <input type="submit" value="Log In" />
      </form>
 */}


    </div>
  );
}

export default App;
