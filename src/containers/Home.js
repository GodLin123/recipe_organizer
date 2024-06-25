import React from 'react';
import Sidebar from '../components/Sidebar';
import TaskArea from '../components/TaskArea';
import { Box } from '@mui/material';

const Home = () => (
  <Box sx={{ display: 'flex', height: '100vh' }}>
    <Sidebar />
    <TaskArea />
  </Box>
);

export default Home;
