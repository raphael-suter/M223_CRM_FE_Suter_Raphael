import React, { useEffect, useState } from "react";
import { Button, Container, ListGroup, Modal, Navbar } from "react-bootstrap";
import ProjectList from "./ProjectList";

const Home = () => {
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [standard, setStandard] = useState(localStorage.getItem("standard"));

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
            localStorage.removeItem("id");
            localStorage.removeItem("token");
            localStorage.removeItem("standard");
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
            localStorage.removeItem("id");
            localStorage.removeItem("token");
            localStorage.removeItem("standard");
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

  const changeStandard = (id) => {
    setStandard(id);
    localStorage.setItem("standard", id);
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
        <h2>Standard Projekt</h2>
        <ProjectList
          projects={projects.filter(
            ({ employees }) =>
              employees.filter(({ id }) => id == standard).length > 0
          )}
          loadProject={loadProject}
          setStandard={changeStandard}
        />
        <h2 className="mt-4">Meine Projekte</h2>
        <ProjectList
          projects={projects.filter(
            ({ employees }) =>
              employees.filter(({ id }) => id == localStorage.getItem("id"))
                .length > 0
          )}
          loadProject={loadProject}
          setStandard={changeStandard}
        />
        <h2 className="mt-4">Projekte</h2>
        <ProjectList
          projects={projects}
          loadProject={loadProject}
          setStandard={changeStandard}
        />
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
                {project.employees.map(({ id, firstname, lastname }, index) => (
                  <ListGroup.Item
                    key={index}
                    className={
                      id == localStorage.getItem("id") ? "bg-info" : ""
                    }
                  >
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
