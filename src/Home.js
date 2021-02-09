import React, { useEffect, useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((response) => response.json())
      .then(({ message }) => setMessage(message))
      .catch((error) => alert(error));
  }, []);

  return <h1>{message}</h1>;
};

export default Home;
