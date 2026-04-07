import {
  Container,
  Title,
  Box,
  Space,
  Text,
  TextInput,
} from '@mantine/core';
import { Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <Container
      fluid
    >
      <Outlet />
    </Container>
  );
};

export default Dashboard;

