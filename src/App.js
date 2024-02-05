import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import CompanyContext from "./contexts/CompanyContext";
import JobContext from "./contexts/JobContext";
import SearchContext from "./contexts/SearchContext";
import LoginContext from "./contexts/LoginContext";
import SignupContext from "./contexts/SignupContext";
import CurrentUserContext from "./contexts/CurrentUserContext";
import useLocalStorageState from "./hooks/useLocalStorageState";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./api";
import RouteList from "./RouteList";
import NavBar from "./NavBar";
// import './App.css';

function App() {
  const [ applicationIds, setApplicationIds ] = useState(new Set([]));
  const [ jobs, setJobs ] = useState([]);
  const [ companies, setCompanies ] = useState([]);
  const [ companySearchResults, setCompanySearchResults ] = useState([]);
  const [ jobSearchResults, setJobSearchResults ] = useState([]);
  const [ token, setToken ] = useLocalStorageState("token");
  const [ currentUser, setCurrentUser ] = useState(null);

  useEffect(() => {
    async function getLists() {
      let jobs;
      let companies;

      if (companySearchResults.length === 0 && jobSearchResults.length === 0) {
        companies = await JoblyApi.getCompanies();
        jobs = await JoblyApi.getJobs();
      }
      else if (companySearchResults.length > 0 && jobSearchResults.length === 0) {
        companies = companySearchResults;
        jobs = await JoblyApi.getJobs();
      }
      else if (companySearchResults.length === 0 && jobSearchResults.length > 0) {
        companies = await JoblyApi.getCompanies();
        jobs = jobSearchResults;
      } else {
        companies = companySearchResults;
        jobs = jobSearchResults;
      }

      setJobs(jobs);
      setCompanies(companies);
    }
    getLists();
  }, [companySearchResults, jobSearchResults]);

  useEffect(() => {
    async function requestUser() {
      if (token) {
        try{
          let { username } = jwtDecode(token);
          JoblyApi.token = token;
          let user = await JoblyApi.getUser(username);
          setCurrentUser(user);
          setApplicationIds(new Set(user.applications));
        } catch (err) {
          console.error("Error fetching user data:", err);
          setCurrentUser(null);
        }
      }
    }

    requestUser();

  }, [token]);

  const handleCompanySearch = async (searchParams) => {
    try {
      const res = await JoblyApi.getCompanies(searchParams);
      setCompanySearchResults(res);
    } catch (err) {
      console.error("Error searching companies:", err);
    }
  };

  const handleJobSearch = async (searchParams) => {
    try {
      const res = await JoblyApi.getJobs(searchParams);
      setJobSearchResults(res);
    } catch (err) {
      console.error("Error searching jobs:", err);
    }
  };

  const handleLogin = async (loginData) => {
    try {
      const resToken = await JoblyApi.login(loginData);
      setToken(resToken);
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  console.log(currentUser);

  const handleSignup = async (signupData) => {
    try {
      const resToken = await JoblyApi.signup(signupData);
      setToken(resToken);
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  const hasAppliedToJob = (id) => {
    return applicationIds.has(id);
  };

  const applyToJob = (id) => {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <JobContext.Provider value={ jobs }>
          <CompanyContext.Provider value={ companies }>
            <SearchContext.Provider value={{ handleCompanySearch, handleJobSearch }}>
              <LoginContext.Provider value={ handleLogin }>
                <SignupContext.Provider value={ handleSignup }>
                  <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
                    <NavBar onLogout={handleLogout} />
                    <main>
                      <RouteList />
                    </main>
                  </CurrentUserContext.Provider>
                </SignupContext.Provider>
              </LoginContext.Provider>
            </SearchContext.Provider>
          </CompanyContext.Provider>
        </JobContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
