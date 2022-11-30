import axios from "axios";
import { apiServer } from "config";

axios.defaults.baseURL = apiServer;
