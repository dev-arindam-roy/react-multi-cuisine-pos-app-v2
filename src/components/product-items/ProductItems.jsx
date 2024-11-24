import React, { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import ProductTab from "./ProductTab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { FiGrid, FiTable } from "react-icons/fi";

const ProductItems = ({ sendProductList, onAddPosItem }) => {
  const [products, setProducts] = useState([]);
  const [copyProducts, setCopyProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productView, setProductView] = useState("GRID");

  const emitReceivedOnAddPosItem = (selectedProductId) => {
    onAddPosItem(selectedProductId);
  };

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
              <FiGrid
                className="icon-btn"
                style={{ marginRight: "2px" }}
                onClick={() => setProductView("GRID")}
              />
              <FiTable
                className="icon-btn"
                onClick={() => setProductView("TAB")}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {productView === "GRID" && (
            <ProductGrid
              sendProductItems={products}
              receivedOnAddPosItem={emitReceivedOnAddPosItem}
            />
          )}
          {productView === "TAB" && (
            <ProductTab
              sendProductItems={products}
              receivedOnAddPosItem={emitReceivedOnAddPosItem}
            />
          )}
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
};

export default ProductItems;
