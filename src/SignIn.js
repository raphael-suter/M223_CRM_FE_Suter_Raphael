import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";

const SignIn = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    fetch("http://localhost:8080/api/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            response.json().then(({ id, token }) => {
              localStorage.setItem("id", id);
              localStorage.setItem("token", token);
              window.location.replace("/");
            });

            break;
          case 400:
          case 404:
            response.json().then(({ message }) => setError(message));
            break;
          default:
            alert("ERROR!");
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <Card className="mx-auto mt-5 shadow-sm" style={{ width: "350px" }}>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Benutzername"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </Form.Group>
          <Button variant="info" onClick={signIn}>
            Sign In
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignIn;
