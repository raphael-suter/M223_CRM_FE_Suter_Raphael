import React from "react";
import { Button, Container } from "react-bootstrap";

const Home = () => {
  const signOut = () => {
    fetch("http://localhost:8080/api/sign_out", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  return (
    <Container>
      <Button onClick={signOut}>Sign Out</Button>
    </Container>
  );
};

export default Home;
