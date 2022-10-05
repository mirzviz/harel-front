import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function LoginForm() {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    try
    {
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        const response = await axios.post("https://localhost:7272/api/Auth/login",
                  JSON.stringify({ username: user, password: pwd }),
                  {
                      headers: { 'Content-Type': 'application/json' },
                      withCredentials: true
                  }
              );
        console.log(response);
        if(response.data){
          sessionStorage.setItem('jwt', response.data);
          navigate("/home");
        }
                
      }
  
      setValidated(true);
    }
    catch(e){
      console.log(e);
      throw e;
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e) => setUser(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="Password" 
            placeholder="Password" 
            required 
            onChange={(e) => setPwd(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>

      </Row>

      <Button type="submit">Login</Button>
    </Form>
  );
}

export default LoginForm;