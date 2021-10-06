import React, { useState,useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography
} from "@material-ui/core";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./style";
import { Link } from "react-router-dom";





const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [auth, setAuth] = useState();
  const cek=localStorage.getItem('user')
  useEffect(() => {
    console.log('cek')
    console.log(localStorage.getItem('user'))
    if(localStorage.getItem!==""||localStorage.getItem!==null) {
    setAuth(true);
}
else if(localStorage.getItem('user')===null){
  setAuth(false);
}
else{
  setAuth(false);
}
},[localStorage.getItem('user')])
  const handleOut=()=>{
    localStorage.clear();
    setAuth(false);
    alert('berhasil log out')
  }
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
            fontWeight="bold"
          >
            <img
              src="https://drive.google.com/uc?id=1z6LOfgX-_tawL0afFMD9efBF_n8LZiE2"
              alt="my logo"
              className={classes.image}
            />
            JAGONGAN
          </Typography>
          <div className={classes.grow}/>
     
          <div>
            <IconButton
              component={Link}
              to="/checkout"
              aria-label="show cart item"
              color="inherit"
            >
              <Badge  color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          <div>
           
            {auth ? (
              <>
                <IconButton
                className={classes.cek}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="inherit"
                 
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="secondary"
                >
                  <AccountCircle />
                </IconButton>
              </>
            )}

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {auth ? (
                <>
                  <MenuItem
                    onClick={handleClose,handleOut}
                  >
                    Logout
                    
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    component={Link}
                    to="/signup"
                    onClick={handleClose}
                  >
                    Sign up
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleClose}
                  >
                    Login
                  </MenuItem>
                </>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
