import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  title:{
    textAlign: "center",
    color: '#030512',

    fontWeight:'bold'

  },
  toolbar: theme.mixins.toolbar,
  content: {
    margin: "10px",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
}));
