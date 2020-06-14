import React, {Component} from 'react';
import './Thankyou.css';

class Thankyou extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'Proceesing',
      orderId: this.props.location.content,
    };
  }
  componentDidMount() {
    const order = localStorage.getItem('order');
    setInterval(() => {
      fetch(`http://localhost:8000/order/${order}`)
        .then(res => res.json())
        .then(res => {
          if (res.Status !== 'Pending') {
            this.setState({status: res.Status});
          }
        });
    }, 60000);
  }

  render() {
    return (
      <h2>
        Your order status is in {this.state.status} for orderID{' '}
        {this.state.orderId}
      </h2>
    );
  }
}
export default Thankyou;
