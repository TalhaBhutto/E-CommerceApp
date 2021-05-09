import React from 'react'
import useStyles from './styles';
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper,InputLabel,FormHelperText,FormControl,NativeSelect } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import Auth from '../Auth/Auth';

function Form({ currentId, setCurrentId }) {
    const [postData, setPostData] = useState({
        title: '', description: '', price: 0, category: '', selectedFile: ''
    });
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        if (post) setPostData(post);
    }, [post])
    useEffect(() => {
        if (!user?.result?.name) {
            return (
                <Auth/>
            )
        }
    }, [user])

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
    const [image,setImage]=useState();
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '', description: '',contact:'', price: 0, category: '', selectedFile: ''
        });
        setImage("");
    }
    const uploadImage = async (e) => {
        setImage(e.target.value);
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
            <Auth/>
        )
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography varient="h6">{currentId ? `Edit` : 'Post'} an Ad</Typography>
                <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="description" variant="outlined" label="description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
                <span className={classes.spann}>
                <TextField name="price" type="number" className={classes.price} variant="outlined" label="price" value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
                <FormControl className={classes.category}>
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
                <TextField name="contact" variant="outlined" label="contact" fullWidth value={postData.contact} onChange={(e) => setPostData({ ...postData, contact: e.target.value })} />
                <div className={classes.fileInput}>
                    <input value={image} type="file" multiple={false} onChange={(e) => { uploadImage(e) }} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Post Ad</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear Form</Button>
            </form>
        </Paper>
    )
}

export default Form
