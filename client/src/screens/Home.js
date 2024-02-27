import React, { Fragment, useState, useEffect } from "react";
import Map from "../components/Map";
import { useUserContext } from "../components/UserContext";
import Loading from "../components/Loading";

const Home = () => {
  const { coordinates } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (coordinates) {
      setIsLoading(false);
    }
  }, [coordinates]);
  return <Fragment>{isLoading ? <Loading></Loading> : <Map></Map>}</Fragment>;
};

export default Home;
