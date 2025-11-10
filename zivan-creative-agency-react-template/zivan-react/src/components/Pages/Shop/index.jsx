import React, { useEffect, useState } from 'react';
import Spacing from '../../Spacing';
import SectionHeadingStyle3 from '../../SectionHeading/SectionHeadingStyle3';
import Sort from '../../ShopComponents/Sort';
import Filter from '../../ShopComponents/Filter';
import ProductList from '../../ShopComponents/ProductList';
import axios from 'axios';
import Pagination from '../../Pagination';
const API = '/data/AllProducts.json';

export default function Shop() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(API)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }, []);
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="Our products"
        subTitle="Shop"
        variant="text-center"
      />
      <Spacing lg="75" md="60" />
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <Filter />
          </div>
          <div className="col-lg-9">
            <div className="cs_height_0 cs_height_lg_60" />
            <Sort />
            <ProductList data={data} />
            <Pagination />
          </div>
        </div>
      </div>
      <Spacing lg="150" md="80" />
    </>
  );
}
