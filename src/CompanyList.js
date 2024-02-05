import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import CompanyContext from "./contexts/CompanyContext";
import SearchContext from "./contexts/SearchContext";
import CompanyCard from "./CompanyCard";
import SearchBox from "./SearchBox";


function CompanyList() {
    const companies = useContext(CompanyContext);
    const { handleCompanySearch, handleJobSearch } = useContext(SearchContext);

    return (
        <div className="col-md-8 offset-md-2">
            <h4 className="display-4 text-center my-3">Companies</h4>
            <Card>
                <CardBody>
                    <SearchBox onSearch={handleCompanySearch} placeholder="Search Company..." />
                    <ListGroup>
                        {companies.map(company => (
                            <Link to={`/companies/${company.handle}`} key={company.handle}>
                                <ListGroupItem>
                                    <CompanyCard company={company} />
                                </ListGroupItem>
                            </Link>
                        ))}
                    </ListGroup>
                </CardBody>
            </Card>
        </div>
    );
}

export default CompanyList;