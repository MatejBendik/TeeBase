import react from "react";
import { AUTH } from "../const/actionTypes";
import * as api from "../api";

export const login =
  (formData: any, navigate: any) => async (dispatch: any) => {
    try {
      // login user

      navigate("/app");
    } catch (error) {
      console.log(error);
    }
  };

export const register =
  (formData: any, navigate: any) => async (dispatch: any) => {
    try {
      // register user

      navigate("/app");
    } catch (error) {
      console.log(error);
    }
  };
