import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';

import {
  Box,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,

  IconButton,
  List,
 
 
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function UserNavbar({}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleDrawerToggle = () => setOpen((prevOpen) => !prevOpen);
  

  const Department = () => {
    // Navigate to the admin panel
    navigate('/Department'); // Change this path as needed
  };
   const Employeegrid = () => {
    // Navigate to the admin panel
    navigate('/'); // Change this path as needed
  };


  const Piechart = () => {
    // Navigate to the admin panel
    navigate('/Piechart'); // Change this path as needed
  };

  const  Barchart = () => {
    // Navigate to the admin panel
    navigate('/Barchart'); // Change this path as needed
  };
 

  const  AttendancePage= () => {
    // Navigate to the admin panel
    navigate('/AttendancePage'); // Change this path as needed
  };
 

  



  return (
    <Box id="maintemplate" sx={{ display: 'flex', backgroundColor: "#1976d2" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit" onClick={handleDrawerToggle} edge="start" sx={{ ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
       
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: "#1976d2",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton style={{ color: "white" }} onClick={handleDrawerToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

      
        <List style={{display:"flex",flexDirection:"column" ,textAlign:"start" ,alignItems:"flex-start" ,marginLeft:"20px"}}>
     
        <p style={{color:"white" ,}}
        onClick={Employeegrid}
       >Employee grid</p>


       <p style={{color:"white" ,}}
        onClick={Department}
       >Department</p>
        



        <p style={{color:"white" ,}}
        onClick={Barchart}
       >Barchart</p>
        




        <p style={{color:"white" ,}}
        onClick={Piechart}
       >Piechart</p>
         
        

         <p style={{color:"white" ,}}
        onClick={AttendancePage}
       >AttendancePage</p>
         

          
        </List>
      </Drawer>
      <Main open={open} />
    </Box>
  );
}