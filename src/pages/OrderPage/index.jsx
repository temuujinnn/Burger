import React, { useEffect, useContext } from "react";
import Spinner from "../../General/spinner";
import Order from "../../components/Order";
import OrderContext from "../../context/OrderContext";
import UserContext from "../../context/UserContext";
const OrderPage = (props) => {
  useEffect(() => {
    orderContext.loadOrders(userContext.state.userId, userContext.state.token);
  }, []);
  const orderContext = useContext(OrderContext);
  const userContext = useContext(UserContext);
  return (
    <div>
      {orderContext.state.loading ? (
        <Spinner />
      ) : (
        orderContext.state.orders.map((el) => (
          <Order key={el[0]} order={el[1]} />
        ))
      )}
    </div>
  );
};

export default OrderPage;
