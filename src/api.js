import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  /** Get list of all companies. */ 

  static async getCompanies(searchParams = {}) {
    let res = await this.request(`companies?${new URLSearchParams(searchParams)}`);
    return res.companies;
  }


  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }


  /** Get list of all jobs. */ 

  static async getJobs(searchParams = {}) {
    let res = await this.request(`jobs?${new URLSearchParams(searchParams)}`);
    return res.jobs;
  }


  /** Get single job by id. */ 

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }


  /** Login with user credentials. */ 

  static async login(loginData) {
    let res = await this.request("auth/token", loginData, "post");
    return res.token;
  }


  /** Sign up a new user. */ 

  static async signup(signupData) {
    let res = await this.request("auth/register", signupData, "post");
    return res.token;
  }


  /** Update users profile. */ 

  static async update(username, updatedData) {
    let res = await this.request(`users/${username}`, updatedData, "patch");
    return res.user;
  }


  /** Get single user by username. */ 

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }


  /** Apply to a job. */
  
  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  // obviously, you'll add a lot here ...
}


export default JoblyApi;
