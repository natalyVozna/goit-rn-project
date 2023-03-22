import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangedUser } from "../redux/auth/authOperations";
import { useRoute } from "../router";

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const routing = useRoute(stateChange);

  // User is signed in, see docs for a list of available properties
  useEffect(() => {
    dispatch(authStateChangedUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
