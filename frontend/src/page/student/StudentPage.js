import ProductCart from "../../component/cart/ProductCart";
// import I1 from "../../assets/image/16.webp";
// import I2 from "../../assets/image/15.jpg";
import { useState } from "react";

const dataProduct = [
  {
    id: 1,
    product_name: "IPhone 16",
    des: "Des....",
    Price: 1200,
    stock: 10,
    image: require("../../assets/image/16.webp")
  },
  {
    id: 2,
    product_name: "IPhone  15",
    des: "Des....",
    Price: 1000,
    stock: 10,
    image: require("../../assets/image/15.jpg")
  },
  {
    id: 3,
    product_name: "IPhone 14",
    des: "Des....",
    Price: 800,
    stock: 10,
    image: require("../../assets/image/14.jfif")
  },
  {
    id: 4,
    product_name: "IPhone 13",
    des: "Des....",
    Price: 600,
    stock: 10,
    image: require("../../assets/image/13.jpg")
  },

]
const StudentPage = () =>{
  const [list, setList] = useState(dataProduct);
    return(
        <div style={{padding: 20}}>
          {list.map((item,index) => (
            <ProductCart 
            key={index}
            Image={item.image}
            ProductName={item.product_name}
            Description={item.des}
            Prices={item.Price}
            stock={item.stock}
            onClickAddCart={(value) => alert(value)}
          />
          ))}
            {/* <ProductCart 
              Image={I1}
              ProductName="Shoes"
              Description="Des Shoes"
              Prices= {10}
              stock={10}
            />
            <ProductCart 
              Image={I2}
              ProductName="Jean"
              Description="Des Jeans"
              Prices= {20}
            />
            <ProductCart />
            <ProductCart /> */}

        </div>
    );
};
export default StudentPage;