import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Login from './Login';
import {Home} from './Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate 
} from "react-router-dom";
import EditCustomer from './EditCustomer';

function App() {

  const [token, setToken] = useState('');
  const [customers, setCustomers] = useState([]);

  return (
    <Container>
      <Router>
        <Routes>

          <Route path="/login" element={<Login /> } />

          <Route path="/home" element={<Home customers={customers} setCustomers={setCustomers}/> } />

          <Route path="/" element={ <Navigate to="/login" /> } />
          
          <Route path="/edit/:customerId" element={ <EditCustomer customers={customers}/> } />

        </Routes>
      </Router>
    </Container>
);
}

export default App;
