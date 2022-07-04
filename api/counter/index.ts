import axios from "axios";
import { socialApiClient } from "../client";

export const api = {
  getCount() {
    return socialApiClient.get("/get");
  },
};
