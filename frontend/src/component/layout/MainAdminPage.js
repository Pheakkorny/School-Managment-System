import { Spin } from "antd";
import React from "react";
const MainAdminPage = ({ loading = false, children }) => {
    return(
        <div>
            <Spin spinning={loading}>
                <div>{children}</div>
            </Spin>
        </div>
    )
};
 export default MainAdminPage;