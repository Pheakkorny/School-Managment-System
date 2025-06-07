import styles from "./AboutPage.module.css";
import {Button, Flex} from "antd";
import {SaveOutlined} from "@ant-design/icons";
const AboutPage = () =>{
    return (
        <div>
            <Flex>
            <h1>AboutPage</h1>
            <Button >default</Button>
            <Button type="primary">Primary</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="primary" disabled>disabled</Button>
            <Button danger>danger</Button>
            <Button className={styles.danger}>danger</Button>
            <Button type="primary" shape="circle">A</Button>
            <Button loading={true}>Loading...</Button>
            <Button>
                <SaveOutlined/>
            </Button>
            <Button icon={<SaveOutlined/>}>Button Icon</Button>
            <Button icon={<SaveOutlined/>} iconPosition="end">Button Icon</Button>
            </Flex>
        </div>
    );
};
export default AboutPage;