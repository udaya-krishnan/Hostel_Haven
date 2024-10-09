import { verifyamount } from "../../features/Host/auth/authAction";
import { RazorpayVerify ,RetryVerify} from "../../features/PaymentAction";

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
            navigate(`/reservationdetails?id=${reservationId}`);
          }, 2000); 
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



export function RetryPay(amount,currency,order_id,paymentId,dispatch,navigate,toast,id){
  return {
    key: 'rzp_test_iPZZ7eS2qqkR1R', // Razorpay test key (replace with 
    amount: amount.toString(),
    currency: currency,
    name: 'Hostel Haven',
    description: 'Test Transaction',
    order_id: order_id,
    handler: async function (response) {
      console.log(response);
      
      dispatch(RetryVerify(response, paymentId))
        .then(() => {
          toast.success('Payment Completed', {
            hideProgressBar: true,
            className: 'custom-toast-success',
            autoClose: 2000
          });
          
          
          setTimeout(() => {
            navigate(0);
          }, 2000); 
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





export function AddAmount(amount,currency,order_id,dispatch,toast,hostId,add,totalBalance,setTotalBalance,setAllTransactions,todayAmount,setTodayAmount){
  return {
    key: 'rzp_test_iPZZ7eS2qqkR1R', // Razorpay test key (replace with live key in 
    amount: amount.toString(),
    currency: currency,
    name: 'Hostel Haven',
    description: 'Test Transaction',
    order_id: order_id,
    handler: async function (response) {
      console.log(response);
      
      // Handle successful payment here (save details or verify the payment)
      console.log("hostId",hostId);
      console.log("add",add);
      
      dispatch(verifyamount(response,hostId, add))
        .then(() => {
          toast.success('Payment Completed', {
            hideProgressBar: true,
            className: 'custom-toast-success',
            autoClose: 2000
          });
          let newTotal=parseInt(totalBalance)+parseInt(add)
          setTotalBalance(newTotal)
          const newTransaction = {
            transaction_type:'Credited' ,
            amount: add,
            createdAt: new Date()
          };

          // Update the transaction list
          setAllTransactions((prev) => [...prev, newTransaction]);

          let totalToday=parseInt(todayAmount)+parseInt(add)
          setTodayAmount(totalToday)
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
