import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';

const RAZORPAY_KEY_ID = 'rzp_test_XVGJEOzTMNbmOB';
const RAZORPAY_KEY_SECRET = 'VR564gQve0rNzdU3zNjMjhVK';
const Razorpay = () => {
  let razorpayKeyId = RAZORPAY_KEY_ID;
  let razorpayKeySecret = RAZORPAY_KEY_SECRET;

  const amount = 100;
  const currency = 'INR';

  const handlePayment = () => {
    var options = {
      description: 'Testing Purpose',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: currency,
      key: razorpayKeyId, // Your api key
      amount: amount,
      name: 'TestP',
      order_id: '',
      prefill: {
        email: 'xyzvoid@gmail.com',
        contact: '9191919191',
        name: 'Vishwas',
      },
      theme: {color: '#F37254'},
      method: 'upi',
    };

    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  return (
    <View>
      <Text>App </Text>
      <TouchableOpacity
        style={{
          width: '90%',
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'orange',
          alignSelf: 'center',
        }}
        onPress={() => {
          handlePayment();
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          Payment
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Razorpay;
