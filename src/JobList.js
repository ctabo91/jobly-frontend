import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobContext from "./contexts/JobContext";
import SearchContext from "./contexts/SearchContext";
import { Card, CardBody, ListGroup, ListGroupItem, CardText } from "reactstrap";
import JobCard from "./JobCard";
import SearchBox from "./SearchBox";


function JobList() {
    const [company, setCompany] = useState(null);
    const jobs = useContext(JobContext);
    const { handleCompanySearch, handleJobSearch } = useContext(SearchContext);
    const { handle } = useParams();

    useEffect(() => {
        async function requestSingleCompany() {
            try{
                let company = await JoblyApi.getCompany(handle);
                setCompany(company);
            } catch (err) {
                console.error("Error fetching company data:", err);
                setCompany(null);
            }
        }

        if (handle) {
            requestSingleCompany();
        } else {
            setCompany(null);
        }
    }, [handle]);

    return (
        <div className="col-md-8 offset-md-2">
            {company ? (
                    <h4 className="display-4 text-center my-3">{company.name}</h4>
            ) : (
                <h4 className="display-4 text-center my-3">Jobs</h4>
            )}
            <Card>
                <CardBody>
                    {!company ? <SearchBox onSearch={handleJobSearch} placeholder="Search Job..." /> : null}
                    {company && (
                        <>
                            <CardText className="text-center my-4"><b>{company.description}</b></CardText>
                        </>
                    )}
                    <ListGroup>
                        {(company ? company.jobs : jobs).map(job => (
                            <ListGroupItem key={job.id}>
                                <JobCard job={job} />
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </CardBody>
            </Card>
        </div>
    );
}

export default JobList;