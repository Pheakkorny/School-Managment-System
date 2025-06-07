
import styles from "./ProductCart.module.css";
// import I1 from "../../assets/image/15.jpg";
import { useState } from "react";
const ProductCart = ({
    ProductName ="Women Shoe",
    Description ="Des101",
    Prices = 10,
    stock = 0,
    Image
}) => {
    const [value, setvalue] = useState(0);
    const onClickAddCart = () =>{
    }
    return (
        <div className={styles.container}>
            {/* img */}
            <img src= {Image} width={150} height={150}/>
            <div className={styles.ProductName}>{ProductName}</div>
            <div>{Description}</div>
            <div>Price : {Prices}$</div>
            <div>Final Stock :{stock} pcs</div>
            <button onClick={onClickAddCart}>Add To Cart</button>
        </div>
    );
};
export default ProductCart;