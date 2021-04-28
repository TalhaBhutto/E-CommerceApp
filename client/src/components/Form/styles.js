import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  formControl: {
    minWidth: "100px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  spann:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price:{maxWidth:"150px",minWidth:"120px",marginRight:"15px"},
  category:{maxWidth:"150px",minWidth:"120px",marginLeft:"15px"},

}));