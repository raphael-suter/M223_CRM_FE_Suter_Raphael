import React, { useEffect, useState } from "react";
import { Button, Container, ListGroup, Modal, Navbar } from "react-bootstrap";

const Home = () => {
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!token || token.trim() === "") {
      window.location.replace("/sign_in");
      return;
    }

    fetch("http://localhost:8080/api/private/project", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            response.json().then((projects) => setProjects(projects));
            break;
          case 401:
            localStorage.removeItem("token");
            window.location.replace("/sign_in");

            break;
          default:
            alert("ERROR!");
        }
      })
      .catch((error) => alert(error));
  }, [token]);

  const signOut = () => {
    fetch("http://localhost:8080/api/sign_out", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
          case 404:
            localStorage.removeItem("token");
            window.location.replace("/sign_in");

            break;
          default:
            alert("ERROR!");
        }
      })
      .catch((error) => alert(error));
  };

  const loadProject = (id) => {
    fetch(`http://localhost:8080/api/private/project/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            response.json().then((project) => {
              setProject(project);
              setShowDialog(true);
            });
            break;
          case 401:
            localStorage.removeItem("token");
            window.location.replace("/sign_in");

            break;
          default:
            alert("ERROR!");
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <Navbar bg="light shadow-sm">
        <Navbar.Brand>CRM</Navbar.Brand>
        <Button variant="info" className="ml-auto" onClick={signOut}>
          Sign Out
        </Button>
      </Navbar>
      <Container className="py-5">
        <h2>Projekte</h2>
        <ListGroup>
          {projects.map(({ id, name, description }, index) => (
            <ListGroup.Item
              className="d-flex justify-content-between align-items-center"
              key={index}
            >
              <div>
                <p className="mb-0">{name}</p>
                <p className="mb-0">{description}</p>
              </div>
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => loadProject(id)}
              >
                Mehr
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {project && showDialog && (
          <Modal show={true}>
            <Modal.Header>
              <Modal.Title>
                <p className="mb-0">{project.name}</p>
                <p className="mb-0">{project.description}</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup>
                {project.employees.map(({ firstname, lastname }, index) => (
                  <ListGroup.Item key={index}>
                    <p className="mb-0">
                      {firstname} {lastname}
                    </p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDialog(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </>
  );
};

export default Home;
