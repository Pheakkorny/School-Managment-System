import { Outlet, Link, useNavigate} from "react-router-dom";
import styles from "./MainLayout.module.css";
const MainLayout = () =>{
    const onClickBtn1 = () =>{
        ///....
        //window.location.href = "/about"; // link with reload page
        navigate("/student"); // link with non reload page
    }
    const navigate = useNavigate();
    return (
        <div>
            <ul className={styles.menu}>
               <li><Link to={"/"} class="active">Home</Link></li>
               <li><Link to={"/student"} >Student</Link></li>
               <li><Link to={"/about"}>About</Link></li> {/*link with not relaod page  */}
            </ul>
            <button onClick={onClickBtn1}>Link to About</button>
            {/* <div style={{height:60,backgroundColor:"gray"}}>
               <div>Dashboad</div>
            </div> */}
            <div>
                <div>Body</div>
                <Outlet/>
            </div>
        </div>
    );
};
export default MainLayout;