import { createContext, useEffect, useReducer } from "react";

export const INITIAL_STATE = {
  avatar: false,
  socials: false,
  password: false,
  bio: false,
  fullname: false
};

export const settingUpdateReducer = (state, action) => {
  switch (action.type) {
    case "AVATAR": {
      return {
        avatar: true,
        socials: false,
        password: false,
        fullname: false,
        bio: false,
      };
    }
    case "SOCIALS": {
      return {
        avatar: false,
        socials: true,
        fullname: false,
        password: false,
        bio: false,
      };
    }
    case "FULLNAME": {
      return {
        avatar: false,
        fullname: true,
        socials: false,
        password: false,
        bio: false,
      };
    }
    case "PASSWORD": {
      return {
        avatar: false,
        fullname: false,
        socials: false,
        password: true,
        bio: false,
      };
    }
    case "BIO": {
      return {
        fullname: false,
        avatar: false,
        socials: false,
        password: false,
        bio: true,
      };
    }
    default:
      return state;
  }
};
