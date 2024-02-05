import React, { useContext, useState, useEffect } from "react";
import { Card, CardBody, CardText, CardTitle, Button } from "reactstrap";
import CurrentUserContext from "./contexts/CurrentUserContext";


function JobCard({ job }) {
    const { currentUser, setCurrentUser, hasAppliedToJob, applyToJob } = useContext(CurrentUserContext);
    const [applied, setApplied] = useState();

    useEffect(() => {
        setApplied(hasAppliedToJob(job.id))
    }, [job.id, hasAppliedToJob]);

    const handleApply = async (e) => {
        if (hasAppliedToJob(job.id)) return;
        applyToJob(job.id);
        setApplied(true);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">
                    <Card className="single-card">
                        <CardBody className="d-flex justify-content-between align-items-center">
                            <div>
                                <CardTitle><b>{job.title}</b></CardTitle>
                                <CardText>
                                    Salary: {job.salary}
                                </CardText>
                                <CardText>
                                    Equity: {job.equity}
                                </CardText>
                            </div>
                            <Button
                                color="danger"
                                onClick={handleApply}
                                disabled={applied}
                            >
                                {applied ? "Applied" : "Apply"}
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default JobCard;