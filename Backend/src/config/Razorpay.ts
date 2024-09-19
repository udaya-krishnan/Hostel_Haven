import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAYID || 'YOUR_KEY_ID',
    key_secret: process.env.RAZORPAYSECRET || 'YOUR_KEY_SECRET',
  });
  



  export const verify=async(razorpay_order_id:string,razorpay_payment_id:string,razorpay_signature:string)=>{
    try {
      console.log(razorpay_order_id,razorpay_payment_id,"the teo");
      
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAYSECRET || 'rzp_test_iPZZ7eS2qqkR1R');
        console.log(hmac,"hmac");
        
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        console.log(generated_signature,"generated");
        console.log(razorpay_signature,"sign");
        
        
      
        if (generated_signature === razorpay_signature) {
          console.log('success');
          
          return { status: 'success' }
        } else {
          console.log('failerr');
          
          return { status: 'failure' }
        }
        
    } catch (error:any) {
        console.log(error.message);
        
    }
  }