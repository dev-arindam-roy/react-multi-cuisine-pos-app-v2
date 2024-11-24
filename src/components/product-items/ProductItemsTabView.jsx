import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FiPlus, FiGrid, FiTable } from "react-icons/fi";

const ProductItemsTabView = ({ sendProductList, onAddPosItem }) => {
  const [products, setProducts] = useState([]);
  const [copyProducts, setCopyProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = products.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filterUniqueCategories = (productList) => {
    return [...new Set(productList.map((item) => item.category))];
  };

  const filterCategoryHandler = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    setSearchTerm("");
    if (selected === "") {
      setProducts(copyProducts);
    } else {
      setProducts(copyProducts.filter((item) => item.category === selected));
    }
  };

  useEffect(() => {
    if (searchTerm !== "") {
      setProducts(filteredProducts);
    } else {
      const _copyProducts = [...copyProducts];
      setProducts(_copyProducts);
    }
  }, [searchTerm]);
  useEffect(() => {
    if (sendProductList) {
      setProducts(sendProductList);
      setCopyProducts(sendProductList);
      const uniqueCategories = filterUniqueCategories(sendProductList);
      setCategories(uniqueCategories);
    } else {
      setProducts([]);
      setCopyProducts([]);
      setCategories([]);
    }
  }, [sendProductList]);
  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col md={5} className="product-list-heading">
              POS Items - ({copyProducts.length})
              {selectedCategory && (
                <span className="mx-2">{` - ${selectedCategory} (${products.length})`}</span>
              )}
            </Col>
            <Col md={3}>
              <select
                className="form-control"
                value={selectedCategory}
                onChange={filterCategoryHandler}
              >
                <option value="">All Items</option>
                {categories &&
                  categories.length &&
                  categories.map((catItem, index) => {
                    return (
                      <option value={catItem} key={"catItem-" + index}>
                        {catItem}
                      </option>
                    );
                  })}
              </select>
            </Col>
            <Col md={3}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={1} className="grid-tab-action-btn">
              <FiGrid className="icon-btn" style={{marginRight: '2px'}} />
              <FiTable className="icon-btn" />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
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
                    <th style={{textAlign: 'right'}}>#</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((item, index) => {
                      return (
                        <tr>
                          <th>{index + 1}.</th>
                          <td>
                            <img
                              src={require(`../../item-images/${item?.image}`)}
                              alt={item?.name}
                              style={{width: '50px'}}
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
                            <span style={{fontWeight: '600'}}>{item?.name}</span>
                          </td>
                          <td style={{fontWeight: '600'}}>
                            {process.env.REACT_APP_AUTH_CURRENCY || "Rs."}
                            {parseFloat(item?.price).toFixed(2)}
                          </td>
                          <td style={{textAlign: 'right'}}>
                            <Button
                                type="button"
                                variant="primary"
                                size="sm"
                                onClick={() => onAddPosItem(item?.id)}
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
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
};

export default ProductItemsTabView;
