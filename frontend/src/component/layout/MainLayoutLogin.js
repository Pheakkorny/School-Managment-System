import { Outlet } from "react-router-dom";


const MainLayoutLogin = () =>{
    return (
        <div>
            <div style={{height:60,backgroundColor:"blue"}}>
               <div>DashboadLogin</div>
            </div>
            <div>
                <div>Main</div>
                <Outlet/>
            </div>
        </div>
    );
};
export default MainLayoutLogin;