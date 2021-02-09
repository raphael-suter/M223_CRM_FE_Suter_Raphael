import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import { Button, ListGroup } from "react-bootstrap";

const ProjectList = ({ projects, loadProject, setStandard }) => {
  return (
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
          <div>
            <Button
              className="mr-3"
              variant="outline-info"
              size="sm"
              onClick={() => setStandard(id)}
            >
              Standard
            </Button>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => loadProject(id)}
            >
              Mehr
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ProjectList;
