import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProductGrid = ({ sendProductItems, receivedOnAddPosItem }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(sendProductItems);
  }, [sendProductItems]);
  return (
    <>
      <Row>
        {products.length > 0 ? (
          products.map((item, index) => {
            return (
              <Col
                key={`pos-item-${item?.id}-${index}`}
                xs={12}
                sm={6}
                md={3}
                className="mb-3 text-center"
              >
                <div
                  className="item-box"
                  onClick={() => receivedOnAddPosItem(item?.id)}
                >
                  <div className="item-image">
                    <img
                      src={require(`../../item-images/${item?.image}`)}
                      alt={item?.name}
                    />
                  </div>
                  <div className="item-name">
                    {item?.category && (
                      <span className="item-category">
                        {item?.category}
                        <br />
                      </span>
                    )}
                    {item?.name}
                  </div>
                  <div className="item-price">
                    {process.env.REACT_APP_AUTH_CURRENCY || "Rs."}
                    {parseFloat(item?.price).toFixed(2)}
                  </div>
                </div>
              </Col>
            );
          })
        ) : (
          <Col>
            <p>Sorry! No Products Available</p>
          </Col>
        )}
      </Row>
    </>
  );
};

export default ProductGrid;
