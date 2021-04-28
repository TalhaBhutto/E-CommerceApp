import React from 'react'
import useStyles from './styles';
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper,InputLabel,FormHelperText,FormControl,NativeSelect } from '@material-ui/core';
//import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import NativeSelect from '@material-ui/core/NativeSelect';


function Form({ currentId, setCurrentId }) {
    const [postData, setPostData] = useState({
        title: '', description: '', price: 0, category: '', selectedFile: ''
    });
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const classes = useStyles();
    const [image, setImage] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '', message: '', tags: '', selectedFile: ''
        });
        setImage("");
    }
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setPostData({ ...postData, selectedFile: base64 });
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader?.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography varient="h6" align="center">
                    Please login to post Ads.
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography varient="h6">{currentId ? `Edit` : 'Post'} an Ad</Typography>
                <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="description" variant="outlined" label="description" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <span className={classes.spann}>
                <TextField name="price" type="number" className={classes.price} variant="outlined" label="price" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
                <FormControl half className={classes.category}>
                    <InputLabel htmlFor="age-native-helper">Category</InputLabel>
                    <NativeSelect
                        value={postData.category}
                        onChange={(e) => setPostData({ ...postData, category: e.target.value })}
                    >
                        <option aria-label="None" value="" />
                        <option value={"Vehicles"}>Vehicles</option>
                        <option value={"Electronics"}>Electronics</option>
                        <option value={"Property"}>Property</option>
                        <option value={"Services"}>Services</option>
                    </NativeSelect>
                    <FormHelperText>Select suitable category.</FormHelperText>
                </FormControl>
                </span>
                <div className={classes.fileInput}>
                    <input value={image} type="file" multiple={false} onChange={(e) => { uploadImage(e) }} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
