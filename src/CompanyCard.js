import React from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";


function CompanyCard({ company }) {
    return (
        <section>
            <Card className="single-card">
                <CardBody>
                    <CardTitle>
                        <b>{company.name}</b>
                    </CardTitle>
                    <CardText>
                        {company.description}
                    </CardText>
                </CardBody>
            </Card>
        </section>
    );
}

export default CompanyCard;