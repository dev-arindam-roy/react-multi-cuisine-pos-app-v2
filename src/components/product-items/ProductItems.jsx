import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const ProductItems = ({ sendProductList, onAddPosItem }) => {
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
            <Col md={6} className="product-list-heading">
              POS Items - ({copyProducts.length})
              {
                (selectedCategory) && (
                  <span className="mx-2">{` - ${selectedCategory} (${products.length})`}</span>
                )
              }
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
          </Row>
        </Card.Header>
        <Card.Body>
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
                      onClick={() => onAddPosItem(item?.id)}
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
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
};

export default ProductItems;
