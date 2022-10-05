import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";


export const Home = ({customers, setCustomers}) => {

    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [filterText, setFilterText] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setFilteredCustomers(customers);
        async function fetchData(){
            try
            {
                const response = await axios.get("https://localhost:7272/api/Customers", {
                    headers: 
                    { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("jwt")}` 
                    },
                    withCredentials: true,
                });
                console.log(JSON.stringify(response?.data));
                setCustomers(response?.data);
                setFilteredCustomers(response?.data);
            }
            catch(err)
            {
                console.log(err);
                throw err;
            }
        }
        fetchData();
    }, []);

    const handleKeyDown = (event) => {
        if (event.key !== 'Enter') {
          return;
        }

        const filteredCustomers = customers.filter(customer => {
            const customerValues = Object.values(customer);
            for(let propValue of customerValues){
                const propString = propValue.toString();
                const indexOfFilter = propString.indexOf(filterText);
                if(indexOfFilter !== -1)
                    return true;
            }
            return false;
        });

        console.log(filteredCustomers);
        setFilteredCustomers(filteredCustomers);
    }

  return (
    <>
        <InputGroup className="mt-3 mb-3" onChange={e => setFilterText(e.target.value)} onKeyDown={handleKeyDown}>
        <Form.Control
          placeholder="Filter"
        />
        </InputGroup>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Date</th>
                <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {filteredCustomers.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.date}</td>
                        <td>{customer.phone}</td>
                        <td><Button onClick={() => navigate(`/edit/${customer.id}`)}>edit customer</Button></td>
                    </tr>
                ))}

            </tbody>
        </Table>
    </>
  )
}
