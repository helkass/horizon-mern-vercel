import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Container from '../../components/Container';
import Dashboard from "../../components/customer/Dashboard";
import Sidebar from '../../components/customer/SideBar';
import Order from "../../components/customer/Order";

const Customer = (props) => {
    const [component, setComponent] = useState("dashboard");
    const getComponent = (data) => {
        setComponent(data)
    }
  return (
    <Layout>
        <Container>
            <Sidebar component={getComponent}>
            {
                component === "dashboard" && <Dashboard/> ||
                component === "order" && <Order/>
            }
            </Sidebar>
        </Container>
    </Layout>
  )
}

export default Customer;