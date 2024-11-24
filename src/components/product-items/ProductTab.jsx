import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FiPlus } from "react-icons/fi";

const ProductTab = ({ sendProductItems, receivedOnAddPosItem }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(sendProductItems);
  }, [sendProductItems]);
  return (
    <>
      <Row>
        <Col>
          <table className="table table-xs">
            <thead>
              <tr>
                <th>SL</th>
                <th>Image</th>
                <th>Category</th>
                <th>Item Name</th>
                <th>Price</th>
                <th style={{ textAlign: "right" }}>#</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((item, index) => {
                  return (
                    <tr key={'itemtab-' + index}>
                      <th>{index + 1}.</th>
                      <td>
                        <img
                          src={require(`../../item-images/${item?.image}`)}
                          alt={item?.name}
                          style={{ width: "50px" }}
                        />
                      </td>
                      <td>
                        {item?.category && (
                          <span className="tbl-item-category">
                            {item?.category}
                            <br />
                          </span>
                        )}
                      </td>
                      <td>
                        <span style={{ fontWeight: "600" }}>{item?.name}</span>
                      </td>
                      <td style={{ fontWeight: "600" }}>
                        {process.env.REACT_APP_AUTH_CURRENCY || "Rs."}
                        {parseFloat(item?.price).toFixed(2)}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          onClick={() => receivedOnAddPosItem(item?.id)}
                        >
                          <FiPlus style={{ marginTop: "-2px" }} /> Add
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>Sorry! No Products Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
};

export default ProductTab;
