import { Col, Layout, Row, Typography } from "antd";
import Navbar from "./commons/Navbar";

export default function MainLayout(props) {
    return (
        <Layout className="layout">
            <Layout.Header>
                <Navbar />
            </Layout.Header>
            <Layout.Content className="site-content">
                {props.children}
            </Layout.Content>
            <Layout.Footer>
                <Row justify="center">
                    <Col>
                        <Typography.Title level={5}>
                            MemeCoin &copy; {(new Date()).getFullYear()} |
                            Hire me: <a href="https://linkedin/in/narteykodjosarso" rel="noreferrer">Nartey Kodjo-Sarso</a>
                        </Typography.Title>
                    </Col>
                </Row>
            </Layout.Footer>
        </Layout>
    )
}