import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
 
  itemtitle: {
    fontWeight: "bold",
    fonstsize: "20px",
  },
  root: {
    maxWidth: "100%",
    margin: "5px",
    boxShadow: "2px 5px #888888",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
