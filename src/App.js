import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
import { Navbar, CheckOut,Login,SignUp ,Footer,Eror} from "./component";
import Product from "./component/Product/Product";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Check from './component/checkout/Checkout'

const AllGet = gql`
  query MyQuery {
    itemlist {
      title
      price
      img
      id
      descript
    }
  }
`;

function App() {
  const { data } = useQuery(AllGet);

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Product data={data} />
            <Footer/>
          </Route>
          <Route exact path="/checkout">
            <CheckOut />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/cek">
            <Check />
          </Route>
          <Route exact path="*">
            <Eror />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
