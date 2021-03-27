import React, { useState, useEffect, Suspense, useContext } from "react";
import { Redirect } from "react-router-dom";
import css from "./style.module.css";
import Toolbar from "../../components/Toolbar";
import SideBar from "../../components/SideBar";
import { Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import Logout from "../../components/logout";
import { BurgerStore } from "../../context/BurgerContext";
import { OrderStore } from "../../context/OrderContext";
import UserContext from "../../context/UserContext";

const BurgerPage = React.lazy(() => {
  return import("../BurgerPage");
});
const OrderPage = React.lazy(() => {
  return import("../OrderPage");
});
const Signup = React.lazy(() => {
  return import("../signUpPage");
});

const App = (props) => {
  const userCtx = useContext(UserContext);
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar((prevShowSidebar) => !prevShowSidebar);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      if (expireDate > new Date()) {
        userCtx.loginUserSuccess(token, userId, expireDate, refreshToken);
      } else {
        //token hugatsaa duussan logout hine
        userCtx.logout();
        //token huchingui bolohod uldej baiga hugatsaag tootsoloh
        userCtx.autologoutAfter(expireDate.getTime() - new Date().getTime());
      }
    }
  }, []);

  return (
    <div>
      <BurgerStore>
        <Toolbar toggleSideBar={toggleSideBar} />
        <SideBar showSideBar={showSideBar} toggleSideBar={toggleSideBar} />
        <main className={css.content}>
          <Suspense fallback={<div>tur hulee</div>}>
            {userCtx.state.userId ? (
              <Switch>
                <Route path="/logout" component={Logout} />

                <Route path="/orders">
                  <OrderStore>
                    <OrderPage />
                  </OrderStore>
                </Route>

                <Route path="/ship" component={ShippingPage} />
                <Route path="/" component={BurgerPage} />
              </Switch>
            ) : (
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={Signup} />
                <Redirect to="login" />
              </Switch>
            )}
          </Suspense>
        </main>
      </BurgerStore>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     autologin: (token, userId) =>
//       dispatch(actions.loginUserSuccess(token, userId)),
//     logout: dispatch(signupActions.logout()),
//     autologoutAfter: dispatch(signupActions.autologoutAfter()),
//   };
// };
export default App;
