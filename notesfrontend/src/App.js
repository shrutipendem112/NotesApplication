import Header from './components/Header';
import './App.css';
import axios from 'axios';
import Note from './components/Note';
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Edit from './components/Edit';
import { Col, Container, Row } from 'react-bootstrap';
import BASE_URL from './api';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [key, setKey] = useState('home');
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/note?search=${search}`);
      console.log(response.data.data);
      setNotes(response.data.data);
    } catch (error) {
      console.log("Error fetching notes", error);
    }
  }
  const handleCreate = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const {title, content} = e.target.elements;
    try {
      const response = await axios.post(`${BASE_URL}/note`, {title: title.value, content: content.value}, config);
      fetchNotes();
      handleClose();
      console.log("note created");
    } catch (error) {
      console.log("Error in creating note", error);
    }
  }
  useEffect(()=>{
    fetchNotes();
  },[search]);
  return (
    <div className="App">
      <Header/>
      <Container>
        <input placeholder='Search notes' onChange={(e) => {setSearch(e.target.value)}}></input>
        <Button variant="outline-info" className='mx-5' onClick={handleShow}>+ Add</Button>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title="All">
        {notes.length > 0 && (
          <Row className='mt-2'>
            {
              notes.map((item) => {
                return(
              <Col lg={4} md={12} sm={12} className='mt-4'>
                {
                  item.isArchived === false ?
                  <Note data={item} refresh={() => {
                    fetchNotes()
                  }}/>
                  :
                  item.isArchived = true
                }
              </Col>
                )
              })
            }
          </Row>
          )}
      </Tab>
      <Tab eventKey="profile" title="Archived">
        {notes.length > 0 && (
          <Row className='mt-5'>
            {
              notes.map((item) => {
                return(
              <Col lg={4} md={12} sm={12}>
                {
                  item.isArchived === true
                  ?
                  <Note data={item} refresh={() => {
                    fetchNotes()
                  }}/>
                  :
                  item.isArchived === false
                }
              </Col>
                )
              })
            }
          </Row>
        )
        }
      </Tab>
    </Tabs>
    </Container>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                placeholder="Content"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
