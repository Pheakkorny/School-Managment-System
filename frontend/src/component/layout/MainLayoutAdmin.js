import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  SmileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dropdown, Layout, Menu, theme,} from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from "./MainLayoutAdmin.module.css";
import { getIsLogin, getUser, logout } from '../../util/service';
const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const itemsMenu = [
  getItem('Dashboard', '/admin/', <PieChartOutlined />),
  getItem('Teacher', '/admin/teacher', <DesktopOutlined />),
  getItem('Student', '/admin/student', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
  getItem('Setting', '9', <FileOutlined />),
];
const items = [
    {
      key: '1',
      label: "Profile",
      icon: <SmileOutlined />,
      
    },
    {
      key: '2',
      label: "Change Password",
      icon: <SmileOutlined />,
     // disabled: true,
    },
    {
      key: '3',
      label: "Setting",
      icon: <SmileOutlined />,
      //disabled: true,
    },
    {
      key: 'logout',
      danger: true,
      label: "Logout",
      icon: <SmileOutlined />,
      onClick: () =>{
        logout();
      }
    },
  ];

const MainLayoutAdmin = () => {
    const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const onClickMenu = (param) =>{
    navigate(param.key);
  };
  const user = getUser();
useEffect(() =>{
    if(!getIsLogin()){
        window.location.href = "/login";
    }
}, []);
if (user == null){
    return null;
};
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={itemsMenu} onClick={onClickMenu} />
      </Sider>
      <Layout>
        <div className={styles.headerContainer}>
            <div className={styles.headerG1}>
                <div className={styles.logo}>
                    <div style={{backgroundColor: "#ffff"}}>Tech</div>
                </div>
                <div>
                   <div className={styles.brandName}>NIT Cambodia</div>
                   <div className={styles.subBrandName}>IT Building</div>
                </div>
            </div>
            <div className={styles.headerG2}>
                <div>
                    <img className={styles.userImage} src={require("../../assets/icon/IMG_4296.JPG")} alt='imgUser'/>
                </div>
                <Dropdown
                    menu={{
                    items,
                    }}
                >
                    <div>
                        <div className={styles.userName}>Admin101</div>
                        <div className={styles.roleName}>IT Manager</div>

                    </div>
                </Dropdown>
               
            </div>
        </div>
        <Content
          style={{
            margin: '10px',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
           style={{
            textAlign: 'center',
            height: '20px',
            lineHeight: '20px',
            padding: '0',
            margin: '0'
             // Ensures content is vertically centered
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayoutAdmin;
// import { Outlet, Link, useNavigate} from "react-router-dom";
// import styles from "./MainLayout.module.css";
// import { useEffect } from "react";
// import { getIsLogin, getUser, logout } from "../../util/service";
// const MainLayoutAdmin = () =>{
//     const onClickBtn1 = () =>{
//         ///....
//         //window.location.href = "/about"; // link with reload page
//         navigate("/student"); // link with non reload page
//     }
//     const navigate = useNavigate();
//     const user = getUser();
//     useEffect(() =>{
//         if(!getIsLogin()){
//             window.location.href = "/login";
//         }
//     }, []);
//     if (user == null){
//         return null;
//     }
//     const onLogout = () =>{
//         logout();
//     };
//     return (
//         <div>
//             <div>User Login : {user.Username}</div>
//             <ul className={styles.menu} style={{backgroundColor: "gray"}}>
//                <li><Link to={"/admin"} class="active">Dashboad</Link></li>
//                <li><Link to={"teacher"} >Teacher</Link></li>
//                <li><Link to={"student"}>Student</Link></li> {/*link with not relaod page  */}
//                <li><Link onClick={onLogout}>Logout</Link></li>
//             </ul>
//             <button onClick={onClickBtn1}>Link to About</button>
//             {/* <div style={{height:60,backgroundColor:"gray"}}>
//                <div>Dashboad</div>
//             </div> */}
//             <div>
//                 <div>Body</div>
//                 <Outlet/>
//             </div>
//         </div>
//     );
// };
// export default MainLayoutAdmin;