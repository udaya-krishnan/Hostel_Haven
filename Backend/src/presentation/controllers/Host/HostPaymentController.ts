import { Response, Request } from "express";
import { HostRepositoryImpl } from "../../../infrastructure/repositories/HostRepo/HostRepositoryImpl";
import { HostPaymentService } from "../../../application/services/HostService/HostPayment";
// import { log } from "console";
import { razorpay, verify } from "../../../config/Razorpay";

const hostRepository = new HostRepositoryImpl();
const hostPaymentService = new HostPaymentService(hostRepository);

export const fetchPayment = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const [findwallet, allTransactions] = await hostPaymentService.fetchPayment(
      id
    );
    console.log("findwallet:", findwallet);
    console.log("allTransactions:", allTransactions);

    if (findwallet == "No Wallet") {
      res.status(200).json({ message: "no payment history" });
    } else {
      res
        .status(200)
        .json({
          message: "payment history success",
          findWallet: findwallet,
          allTransactions: allTransactions,
        });
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addAmount = async (req: Request, res: Response) => {
  try {
    const amount = req.body.amount;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json({ order: order });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyAmount = async (req: Request, res: Response) => {
  try {
    const { hostId, amount } = req.body;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.order;

      console.log("host Id:",hostId);
      console.log("amount:",amount);
      
      
    const verifing = await verify(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (verifing?.status === "success") {
      const response = await hostPaymentService.addamount(hostId, amount);

      if (response) {
        res.status(200).json({ message: "amount add successfully" });
      }
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
