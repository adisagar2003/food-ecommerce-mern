import { useEffect, useState } from "react";
import "./Checkout.css";
import { useSelector } from "react-redux";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
function Checkout() {
  const items = useSelector(state=>state.cart);
  const [totalCost, setTotalCost] = useState(0);
  // calculate total cost from cart items. 
  function calculateTotalCost() {
    console.log(items);
    setTotalCost(items.reduce((a,v) => a = a+v.price, 0));
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
                        <button className="button-checkout">Pay Now</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Checkout