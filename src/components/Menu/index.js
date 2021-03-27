import { React, Fragment, useContext } from "react";
import MenuItem from "../MenuItem";
import css from "./style.module.css";
import UserContext from "../../context/UserContext";

const Menu = (props) => {
  const ctx = useContext(UserContext);
  return (
    <div>
      <ul className={css.Menu}>
        {ctx.state.userId ? (
          <Fragment>
            <MenuItem link="/logout">ГАРАХ</MenuItem>
            <MenuItem exact link="/">
              Шинэ захиалга
            </MenuItem>
            <MenuItem link="/orders">Захиалгууд</MenuItem>
          </Fragment>
        ) : (
          <Fragment>
            <MenuItem link="/login">НЭВТРЭХ</MenuItem>
            <MenuItem link="/signup">БҮРТГҮҮЛЭХ</MenuItem>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default Menu;
