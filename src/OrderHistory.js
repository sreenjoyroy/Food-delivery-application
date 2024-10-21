// src/OrderHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch user's order history here
        const fetchOrders = async () => {
            // Replace with actual API call to get user orders
            const response = await axios.get('http://localhost:3001/api/orders');
            setOrders(response.data);
        };
        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Your Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id}>
                        {/* Display order details */}
                        {/* Example: */}
                        {/* {order.foodItem} - {order.date} */}
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistory;