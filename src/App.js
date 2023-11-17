import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [categoryMovies, setCategoryMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("action");

  useEffect(() => {
    axios
      .get(`${API_URL}/?apikey=${API_KEY}&s=avengers&type=movie`)
      .then((response) => setTrendingMovies(response.data.Search))
      .catch((error) =>
        console.error("Error fetching trending movies:", error)
      );

    fetchMoviesByCategory(selectedCategory);
  }, [selectedCategory]);

  const fetchMoviesByCategory = (category) => {
    if (category) {
      axios
        .get(`${API_URL}/?apikey=${API_KEY}&s=${category}&type=movie`)
        .then((response) => setCategoryMovies(response.data.Search))
        .catch((error) =>
          console.error(`Error fetching ${category} movies:`, error)
        );
    } else {
      setCategoryMovies([]);
    }
  };

  const handleSearch = () => {
    axios
      .get(`${API_URL}/?apikey=${API_KEY}&t=${searchTerm}&type=movie`)
      .then((response) =>
        setSearchResult(response.data.Title ? [response.data] : [])
      )
      .catch((error) => console.error("Error searching movies:", error));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <Container
        className="mt-5"
        style={{ color: "white", backgroundColor: "black", paddingTop: "20px" }}
      >
        <Tabs>
          <TabList>
            <Tab>Trending Movies</Tab>
            <Tab>Hero Section</Tab>
            <Tab>Movies by Category</Tab>
            <Tab>Search Movies</Tab>
          </TabList>

          <TabPanel>
            <h1 className="mb-4">Trending Movies</h1>
            <Row>
              {trendingMovies.map((movie) => (
                <Col key={movie.imdbID} className="mb-3">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={movie.Poster} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Year}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPanel>

          <TabPanel>
            <h1 className="mb-4">Hero Section</h1>
            {trendingMovies.length > 0 && (
              <Row>
                {trendingMovies.slice(0, 3).map((movie) => (
                  <Col key={movie.imdbID} className="mb-3">
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={movie.Poster} />
                      <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Year}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </TabPanel>

          <TabPanel>
            <h1 className="mb-4">Movies by Category</h1>
            <Dropdown onSelect={handleCategoryChange} className="mb-3">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select Category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="action">Action</Dropdown.Item>
                <Dropdown.Item eventKey="comedy">Comedy</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {categoryMovies.length > 0 && (
              <Row>
                {categoryMovies.map((movie) => (
                  <Col key={movie.imdbID} className="mb-3">
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={movie.Poster} />
                      <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Year}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </TabPanel>

          <TabPanel>
            <h1 className="mb-4">Search Movies by Name</h1>
            <Form>
              <Form.Group controlId="formSearch">
                <Form.Control
                  type="text"
                  placeholder="Enter movie name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
              <Button className="mt-3" variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </Form>

            <Row>
              {searchResult.map((movie) => (
                <Col key={movie.imdbID} className="mb-3">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={movie.Poster} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Year}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPanel>
        </Tabs>
      </Container>
    </div>
  );
};

export default App;
