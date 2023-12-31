import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Select, notification, Card, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const { Option } = Select;

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [totalPriceEarned, setTotalPriceEarned] = useState('');
  const [profit, setProfit] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchItems(), fetchUsersCount(), fetchDeliveryBoysRequests(), fetchOrders()]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      calculateTotalPriceEarned();
      calculateProfit();
    }
  }, [loading, orders, expenditure]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3003/food');
      setItems(response.data.food);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchUsersCount = async () => {
    try {
      const response = await axios.get('http://localhost:3003/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users count:', error);
    }
  };

  const fetchDeliveryBoysRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3003/getrequest');
      const filteredRequests = response.data.requested;
      setRequests(filteredRequests);
      console.log(requests.users.email)
    } catch (error) {
      console.error('Error fetching delivery boys requests:', error);
    }
  };
console.log(requests)

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3003/orders');
      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3003/delete/${itemId}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const navigate = useNavigate();
  const updateItem = (item) => {
    const itemId = item?._id;
    if (itemId) {
      navigate(`/update/${itemId}`);
    } else {
      console.error("Item object is null or does not have an _id property.");
      // Handle the error or show an appropriate message to the user.
    }
  }
 
  const approve = (userId) => {
    if (!role) {
      notification.error({
        message: 'Error',
        description: 'Please select a role before approving the request.',
      });
      return;
    }

    axios
      .put(`http://localhost:3003/users/${userId}/role`, {
        role: role,
      })
      .then((res) => {
        if (res.data.status === true) {
          console.log('All is okay');
          notification.success({
            message: 'Approved',
            description: 'Request approved successfully.',
          });

          // Update the user's status to "delivery" after approval
          updateUserStatus(userId);
        } else {
          console.log(res.data.errors);
          notification.error({
            message: 'Error',
            description: 'Something went wrong. Please try again.',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: 'Error',
          description: 'Something went wrong. Please try again.',
        });
      });
  };

  const updateUserStatus = (userId) => {
    axios
      .put(`http://localhost:3003/users/${userId}/status`, {
        status: 'delivery',
      })
      .then((res) => {
        if (res.data.status === true) {
          console.log('User status updated successfully');
          // Send the email notification to the user
          sendEmailNotification(userId);
        } else {
          console.log(res.data.errors);
        }
      })
      .catch((error) => {
        console.error('Error updating user status:', error);
      });
  };

  const sendEmailNotification = (userId) => {
    axios
      .get(`http://localhost:3003/user/${userId}`)
      .then((res) => {
        if (res.data && res.data.user) {
          const { email } = res.data.user;

          // Call the API endpoint to send the email notification
          axios
            .post(`http://localhost:3003/send-notification`, {
              email: email,
              subject: 'Role Update Notification',
              text: 'Your role has been updated to a delivery partner.',
              html: '<p>Your role has been updated to a delivery partner.</p>',
            })
            .then((res) => {
              console.log('Email sent successfully');
            })
            .catch((error) => {
              console.error('Error sending email notification:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const calculateTotalQuantitySold = () => {
    const totalSoldMap = new Map();
    orders.forEach((order) => {
      const itemId = order.deals?._id; // Use optional chaining to access `_id`
      const quantity = Number(order.quantity);
      if (totalSoldMap.has(itemId)) {
        totalSoldMap.set(itemId, totalSoldMap.get(itemId) + quantity);
      } else {
        totalSoldMap.set(itemId, quantity);
      }
    });
    return Array.from(totalSoldMap, ([itemId, totalQuantitySold]) => ({
      key: itemId,
      totalQuantitySold: totalQuantitySold,
    }));
  };

  const calculateTotalPriceEarned = () => {
    const total = orders.reduce((acc, order) => acc + parseFloat(order.price), 0);
    setTotalPriceEarned(total.toFixed(2));
  };

  const calculateProfit = () => {
    const totalEarned = parseFloat(totalPriceEarned);
    const totalExpenditure = parseFloat(expenditure);
    const profitValue = (totalEarned - totalExpenditure).toFixed(2);
    setProfit(profitValue);
  };

  const itemColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Item" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Total Quantity Sold',
      dataIndex: '_id',
      key: 'totalQuantitySold',
      render: (itemId) => {
        const totalQuantitySold = calculateTotalQuantitySold().find((soldItem) => soldItem.key === itemId)?.totalQuantitySold || 0;
        return totalQuantitySold;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <Space>
          <Button type="primary" onClick={() => updateItem(item)}>
            Update
          </Button>
          <Button type="danger" onClick={() => deleteItem(item._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const userColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="User" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];
  const requestColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'users',
      key: 'image',
      render: (user) => <img src={user.image} alt="User" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'User ID',
      dataIndex: 'users',
      key: 'userId',
      render: (user) => user._id,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <Space>
          <Select defaultValue="user" style={{ width: 120 }} onChange={(value) => setRole(value)}>
            <Option value="user">User</Option>
            <Option value="delivery">Delivery</Option>
          </Select>
          <Button type="primary" onClick={() => approve(item.users._id)}>
  Approve
</Button>
        </Space>
      ),
    },
  ];
  const orderColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'Price',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Image',
      dataIndex: 'deals.image',
      key: 'image',
      render: (image) => <img src={image} alt="Item" style={{ width: 50, height: 50 }} />,
    },
  ];

  const itemSoldColumns = [
    {
      title: 'Item Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Quantity Sold',
      dataIndex: '_id',
      key: 'quantitySold',
      render: (itemId) => {
        const quantitySold = calculateTotalQuantitySold().find((soldItem) => soldItem.key === itemId)?.totalQuantitySold || 0;
        return quantitySold;
      },
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Admin Panel</h2>
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', color: '#000' }}>Total Price Earned</div>
            <div style={{ fontSize: '36px', color: '#000', fontWeight: 'bold' }}>{totalPriceEarned} USD</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', color: '#000' }}>Expenditure</div>
            <Input
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              value={expenditure}
              onChange={(e) => setExpenditure(e.target.value)}
              placeholder="Enter Expenditure"
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', color: '#000' }}>Profit</div>
            <div style={{ fontSize: '36px', color: '#000', fontWeight: 'bold' }}>{profit} USD</div>
          </div>
        </div>
      </Card>

      <Card title="Items" style={{ marginBottom: '20px' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table dataSource={items} columns={itemColumns} />
        )}
      </Card>

      <Card title="Users" style={{ marginBottom: '20px' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            Number of users we have: {users.length}
            <Table dataSource={users} columns={userColumns} />
          </>
        )}
      </Card>

      <Card title="Requests" style={{ marginBottom: '20px' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table dataSource={requests} columns={requestColumns} />
        )}
      </Card>

      <Card title="Orders" style={{ marginBottom: '20px' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table dataSource={orders} columns={orderColumns} />
        )}
      </Card>

      <Card title="Item Sales" style={{ marginBottom: '20px' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table dataSource={items} columns={itemSoldColumns} />
        )}
      </Card>
    </div>
  );
};

export default AdminPanel;
