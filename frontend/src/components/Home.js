import React, { Fragment, useState, useEffect } from "react";
import "../App.css";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loading from "./layout/Loading";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import {useParams} from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';


const createSliderWithTooltip =Slider.createSliderWithTooltip;
const Range=createSliderWithTooltip(Slider.Range)


function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [price,setPrice]=useState([1,2000]);
  const [category,setCategory]=useState('');

  const categories=[
    "Chairs",
    "Sofas",
    "Lamps",
    "Tables",
    "Beds",
    "Rugs",
    "Kitchen appliances",
    "Decor",
    "Outdoor furniture",
  ]
  const alert = useAlert();

  const params=useParams();
  const dispatch = useDispatch();
  const { loading, products, error, prdCount,resultsPerPage } = useSelector(
    (state) => state.products
  );

  const keyword= params.keyword;
  console.log(keyword)
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword,currentPage,price,category));
  }, [dispatch, alert, keyword,error,currentPage,price,category]);


  function setCurrentPageNumber(pageNumber){
    setCurrentPage(pageNumber)
  }
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={"Home"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword?(
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1:`1€`,
                          2000:`2000€`
                        }}
                        min={1}
                        max={2000}
                        defaultValue={[1,2000]}
                        tipFormatter={value=>`${value}€`}
                        tipProps={{
                          placement:"top",
                          visible:true
                        }}
                        value={price}
                        onChange={price=>setPrice(price)}
                      />
                      <hr className="my-5"/>
                      <div className="mt-5">
                        <h4 className="mb-3">
                          Categories
                        </h4>
                        <ul className="pl-0">
                          {categories.map(category=>(
                            <li style={{cursor:'pointer',listStyleType:'none'}} key={category} onClick={()=>setCategory(category)}>
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {
                         products && products.map((product) => (
                          <Product key={product._id} product={product} col={4}/>
                        ))
                      }
                    

                    </div>
                  </div>
                </Fragment>

              ):(
                products && products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))

              )}
             
            </div>
          </section>
          {resultsPerPage<=prdCount && (
             <div className="d-flex justify-content-center mt-5">
             <Pagination
               activePage={currentPage}
               itemsCountPerPage={resultsPerPage}
               totalItemsCount={prdCount}
               onChange={setCurrentPageNumber}
               nextPageText={">"}
               prevPageText={"<"}
               firstPageText={"First"}
               lastPageText={"Last"}
               itemClass="page-item"
               linkClass="page-link"
             />
           </div>
          )}
         
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
