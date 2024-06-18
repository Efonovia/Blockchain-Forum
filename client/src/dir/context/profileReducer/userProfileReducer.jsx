
import { createContext, useEffect, useReducer } from "react";

export const INITIAL_STATE = {
  profile: true,
  follows: false,
  socials: false,
  settings: false,
};

export const userProfileReducer = (state, action) => {
  switch (action.type) {
    case "PROFILE": {
      return {
        profile: true,
        follows: false,
        socials: false,
        settings: false,
      };
    }
    case "FOLLOWS": {
      return {
        profile: false,
        follows: true,
        socials: false,
        settings: false,
      };
    }
    case "SOCIALS": {
      return {
        profile: false,
        follows: false,
        socials: true,
        settings: false,
      };
    }
    case "SETTINGS": {
      return {
        profile: false,
        follows: false,
        socials: false,
        settings: true,
      };
    }
    default:
      return state;
  }
};

 