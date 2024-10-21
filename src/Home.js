// src/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';

const Home = () => {
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        const fetchFoodItems = async () => {
            const response = await axios.get('http://localhost:3001/api/food');
            setFoodItems(response.data);
        };
        fetchFoodItems();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Our Menu</h2>
            <Row>
                {foodItems.map(item => (
                    <Col key={item._id} md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>Price: {item.price}</Card.Text>
                                <Button variant="primary">Order Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;