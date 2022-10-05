import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const EditCustomer = ({customers }) => {
  
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [customer, setCustomer] = useState({});
  const params = useParams();
  useEffect(() => {
    const cust = customers.find(customer => customer.id == params.customerId);
    console.log(cust);
    setCustomer(cust);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
      if (form.checkValidity() === true) {
        console.log(customer);
        const response = await axios.put(`https://localhost:7272/api/Customers/${customer.id}`,
                  JSON.stringify(customer),
                  {
                      headers: 
                      { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
                      },
                      withCredentials: true
                  }
              );
        navigate("/home");
      }
      setValidated(true);
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Name"
              aria-describedby="inputGroupPrepend"
              required
              defaultValue={customer.name}
              onChange={(e) => setCustomer({...customer, name: e.target.value})}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Last name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Last name" 
            required 
            defaultValue={customer.lastName}
            onChange={(e) => setCustomer({...customer, lastName: e.target.value})}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>

      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Date</Form.Label>
          <Form.Control 
            type="date" 
            placeholder="Date" 
            required 
            defaultValue={customer.date}
            onChange={(e) => setCustomer({...customer, date: e.target.value})}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>

      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Phone</Form.Label>
          <Form.Control 
            type="text" 
            inputMode="numeric" 
            pattern="\d*"
            placeholder="Phone" 
            required 
            defaultValue={customer.phone}
            onChange={(e) => setCustomer({...customer, phone: e.target.value})}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid phone.
          </Form.Control.Feedback>
        </Form.Group>

      </Row>

      <Button type="submit">Edit customer</Button>
    </Form>
  )
}

export default EditCustomer