import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import { getPosts, searchPosts } from '../../actions/posts'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import Media from 'react-media';

const Navbar = () => {
  const category = [{title:''},{ title: `Vehicles` }, { title: `Property` }, { title: `Electronics` }, { title: `Services` }];
  const [search, setSearch] = useState("");
  const [cat,setCat]=useState({title:""});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts)
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const searchPost = () => {
    dispatch(searchPosts(search+"th3"+cat.title));
    console.log(search+cat.title)
    setSearch("");
  }
  const goHome = () => {
    dispatch(getPosts());
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
                  <div>
                    <Autocomplete
                        id="combo-box-demo"
                        options={category}
                        getOptionLabel={(option) => search !== "" ? (option.title==""?search:"find " + search + " in " + option.title) : option.title}
                        className={classes.SearchText}
                        onChange={(e,v)=>setCat(v)}
                        renderInput={(params) => <TextField {...params} value={""} label="Search" onChange={updateSearch} />}
                      />
                      <Button onClick={searchPost}><SearchOutlinedIcon /></Button>
                  </div>
                  {
                    user?.result ? <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>:null
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
                    <Button style={{ fontFamily: "monospace" }} variant="text" onClick={goHome}>ECom</Button>
                    <div className={classes.SearchBar}>
                      <Autocomplete
                        id="combo-box-demo"
                        options={category}
                        getOptionLabel={(option) => search !== "" ? (option.title==""?search:"find " + search + " in " + option.title) : option.title}
                        style={{ minWidth: "200px", maxWidth: "300px" }}
                        onChange={(e,v)=>setCat(v)}
                        renderInput={(params) => <TextField {...params} value={""} label="Search" onChange={updateSearch} />}
                      />
                      <Button onClick={searchPost}><SearchOutlinedIcon /></Button>
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