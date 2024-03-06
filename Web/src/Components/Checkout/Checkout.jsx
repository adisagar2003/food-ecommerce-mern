import { useEffect, useState } from "react";
import "./Checkout.css";
import { useSelector } from "react-redux";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import axios from "axios";
import { api_url } from "../../api/api";
import Stripe from "stripe";
function Checkout() {
  const items = useSelector(state=>state.cart);
  const [totalCost, setTotalCost] = useState(0);
  const [openPayment, setOpenPayment] = useState(false);

  // calculate total cost from cart items. 
  function calculateTotalCost() {
    console.log(items);
    setTotalCost(items.reduce((a,v) => a = a+v.price, 0));
  }
  
  const handleToken = (totalAmount, token) => {
    try {
        axios.post(`${api_url}/stripe/pay`, {
            token: token.id,
            amount: totalAmount
        });
    } catch (error) {
        console.log(error);
    }
  }

  const tokenHandler = (token) => {
    handleToken(100 ,token);
  }
  useEffect(()=> {
    calculateTotalCost();
  }, [])
  // calculate total cost initially
  return (
    <section className="checkout-section">
        <div className="wrapper">
            <div className="checkout-container">
                <div className='checkout-summary'>
                    <h1>Summary</h1>
                    <div>
                        {items.map((elem, i)=>{
                            return (<CheckoutProduct key={i} image={elem.image} title={elem.foodName} owner={elem.owner} price={elem.price} />)
                        })}
                    </div>
                    <div className="checkout-total-charges">
                        <div>
                            Total Charges 
                        </div>
                        <span>
                            $ {totalCost.toFixed(2)}
                        </span>
                        <br />
                        <button onClick={()=>setOpenPayment(true)} className="button-checkout">Pay Now</button>
                        <div><Stripe stripeKey="pk_test_51N3jlPABf1taX6vPh9mWdIoNydqngYpzmspCWrOHhFwDIZlVZNIoUwkB5PeiRro5tOSjjHYGS99cZYZfwc3MBVLP00hFHlGeOB" token={tokenHandler} /></div>  
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Checkout