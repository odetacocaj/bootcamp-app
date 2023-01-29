import React, { Fragment, useEffect } from "react";
import "../App.css";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loading from "./layout/Loading";
import {useAlert} from 'react-alert';

function Home() {
  const alert=useAlert();

  const dispatch = useDispatch();
  const { loading, products, error, prdCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if(error){
     
      return alert.error(error)
    }
    dispatch(getProducts());

  }, [dispatch,alert,error]);
  return (
    <Fragment>
      {loading ? (
        <Loading/>
      ) : (
        <Fragment>
          <MetaData title={"Home"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
