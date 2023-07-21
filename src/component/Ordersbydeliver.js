import { Table, Space, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function Ordersbydeliver() {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [claimedOrders, setClaimedOrders] = useState([]);
const [userId,setUserId]= useState("")
const[userclaimed,setUserclaimed]=useState([])
const [deliver,setDeliver]=useState("")
  useEffect(() => {
    const token = localStorage.getItem('ssid');
    const decodedToken = jwt_decode(token);
    if (decodedToken) {
      const username = decodedToken.name;
      setName('Successfully Picked By ' + username);
      setDeliver(username)
      const userid = decodedToken.id
    setUserId(userid)
    }
  }, []);

  useEffect(() => {
    fetchItems();
    fetchClaimedOrders();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3003/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchClaimedOrders = () => {
    axios
      .get('http://localhost:3003/claimedorder')
      .then((res) => {
        console.log(res.data);
        setClaimedOrders(res.data.claim.map((item) => item.orders));
        setUserclaimed(res.data.claim)
      })
      .catch((error) => {
        console.error('Error fetching claimed orders:', error);
      });
  };
console.log(claimedOrders)
console.log(userclaimed)
  const claim = (orderId) => {
    setLoadingClaim(true);

    axios
      .put(`http://localhost:3003/product/${orderId}/status`, { status: name })
      .then((res) => {
        if (res.data && res.data.status === true) {
          console.log('All is okay');
          message.success('Claim successful');

          return axios
            .post('http://localhost:3003/claimorder', {
              orders: orderId,
              Claimedby: name,
              user:userId
            })
            .then((res) => {
              if (res.data && res.data.status) {
                console.log('Order claimed successfully');
                message.success('Claim successful');
                fetchClaimedOrders(); // Update the claimedOrders array
              } else {
                console.log('Order claim failed');
                message.error('Claim failed');
              }
            })
            .catch((error) => {
              console.error('Error claiming order:', error);
              message.error('Claim failed');
            });
        } else {
          console.log(res.data.errors);
          if (res.data && res.data.status === false) {
            console.log('Problem');
            message.error('Claim failed');
          }
        }
      })
      .catch((error) => {
        console.error('Error claiming:', error);
        message.error('Claim failed');
      })
      .finally(() => {
        setLoadingClaim(false);
      });
  };

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
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <Space>
          <Button
            type="primary"
            onClick={() => claim(item._id)}
            loading={loadingClaim}
            disabled={claimedOrders.includes(item._id)}
          >
            {claimedOrders.includes(item._id) ? 'Claimed' : loadingClaim ? 'Claiming...' : 'Claim'}
          </Button>
        </Space>
      ),
    },
  ];


  const claimColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="User" style={{ width: 50, height: 50 }} />,
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
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <Space>
          <Button
            type="primary"

          
          >
           Delete
          </Button>
        </Space>
      ),
    },
  ];




  const tableDataOrder = Array.isArray(orders) ? orders : [];
  const tableDataclaim = Array.isArray(userclaimed) ? userclaimed : [];

  return (
    <>
      <Table dataSource={tableDataOrder} columns={orderColumns} />
      <h1>ORDERS  {name}</h1>
      <Table dataSource={tableDataclaim} columns={claimColumns} />
    </>
  );
}

export default Ordersbydeliver;
