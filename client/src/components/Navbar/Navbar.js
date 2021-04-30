import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import { searchPosts } from '../../actions/posts'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import Media from 'react-media';

const Navbar = () => {
  const category = [{ title: `vehicles` }, { title: `property` }, { title: `electronics` }, { title: `services` }];
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts)
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const searchPost = () => {
    dispatch(searchPosts(search));
    setSearch("");
  }
  const updateSearch = (event) => {
    const val = event.target.value;
    setSearch(val)
  }
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    setUser(null);
    history.push('/')
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <>
      <Media query="(max-width:600px)">
        {
          matches => {
            return matches ? (
              <>
                <AppBar className={classes.appBar2} position="static" color="inherit">
                  <div><TextField className={classes.SearchText} value={search} onChange={updateSearch}></TextField>
                    <Button onClick={searchPost}><SearchOutlinedIcon /></Button>

                  </div>
                  {
                    !user?.result ? (
                      <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    ) :
                      (
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                      )
                  }
                </AppBar>
                {user?.result ? (
                  <AppBar className={classes.appBar} position="static" color="inherit">
                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                  </AppBar>
                ) : null}
              </>
            )
              : (
                <>
                  <AppBar className={classes.appBar2} position="static" color="inherit">

                    <div className={classes.SearchBar}>
                      <Autocomplete
                        id="combo-box-demo"
                        options={category}
                        getOptionLabel={(option) => search!==""?"find "+search+" in "+option.title:option.title}
                        style={{ minWidth:"150px",maxWidth:"250px"}}
                        onChange={updateSearch} 
                        renderInput={(params) => <TextField {...params} label="Search" />}
                      />
                      <Button onClick={searchPost}><SearchOutlinedIcon onChange={updateSearch} /></Button>
                    </div>

                    {

                    }
                    <Toolbar className={classes.toolbar}>
                      {user?.result ? (
                        <div className={classes.profile}>
                          <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                          <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                          <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                      ) : null
                      }
                    </Toolbar>
                  </AppBar>
                </>)
          }
        }
      </Media>

    </>
  );
};

export default Navbar;