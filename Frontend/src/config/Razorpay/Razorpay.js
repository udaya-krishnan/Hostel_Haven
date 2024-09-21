import { RazorpayVerify } from "../../features/PaymentAction";

// RazorpayConfig is a utility function, so we should pass dispatch from the component
export function RazorpayConfig(amount, currency, order_id, reservationId, userId, paymentMethod, dispatch, totalPrice, navigate, toast) {
  return {
    key: 'rzp_test_iPZZ7eS2qqkR1R', // Razorpay test key (replace with live key in production)
    amount: amount.toString(),
    currency: currency,
    name: 'Hostel Haven',
    description: 'Test Transaction',
    order_id: order_id,
    handler: async function (response) {
      console.log(response);
      
      // Handle successful payment here (save details or verify the payment)
      dispatch(RazorpayVerify(response, totalPrice, reservationId, userId, paymentMethod))
        .then(() => {
          toast.success('Reservation Successful!', {
            hideProgressBar: true,
            className: 'custom-toast-success',
            autoClose: 2000
          });
          
          // Navigate after a delay (optional)
          setTimeout(() => {
            navigate('/hostelroom');
          }, 2000); // 2-second delay to allow toast to show
        })
        .catch((err) => {
          toast.error('Payment Verification Failed', { autoClose: 3000 });
          console.error("Payment Verification Error:", err);
        });
    },
    prefill: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      contact: '9999999999',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#3399cc',
    },
  };
}
