import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Container } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { ImPencil } from "react-icons/im";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

const Note = ({ data, refresh }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, content } = e.target.elements;
    try {
      const note = await axios.put(`${BASE_URL}/note/${data._id}`, {
        title: title.value,
        content: content.value,
      });
      refresh();
      handleClose();
      console.log("note updated successfully");
    } catch (error) {
      console.log("Error in updating", error);
    }
  };

  //Archive
  const toggleArchive = async() => {
    try {
      const isArchived = !data.isArchived;
      console.log(isArchived);
      const archived = await axios.put(`${BASE_URL}/note/${data._id}`, {
        archivedToggle: isArchived,
      })
      console.log("Archived");
      refresh();
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  //delete
  const handleDelete = async() => {
    try {
      const response = await axios.delete(`${BASE_URL}/note/${data._id}`);
      refresh();
      console.log("deleted");
    } catch (error) {
      console.log("Error is ", error);
    }
  }
  return (
    <>
      <Card style={{ width: "100%" }} className="p-3">
        <Row className="d-flex space-between">
          <Col lg={6}>{new Date(data.createdAt).toLocaleDateString()}</Col>
          <Col lg={6}>
            <Button
              variant="outline-info"
              className="margin-btn mx-1"
              onClick={handleShow}
            >
              <ImPencil />
            </Button>
            <Button variant="outline-info" className="margin-btn mx-1" onClick={handleDelete}>
              <MdDelete />
            </Button>
            <Button
              variant="outline-info"
              className="margin-btn mx-1"
              onClick={() => {toggleArchive()}}
            >
              {data.isArchived === true ? <IoIosEye /> : <FaEyeSlash />}
            </Button>
          </Col>
        </Row>
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>{data.content}</Card.Text>
        </Card.Body>
      </Card>
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
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                defaultValue={data.title}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                placeholder="Content"
                defaultValue={data.content}
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
    </>
  );
};

export default Note;
