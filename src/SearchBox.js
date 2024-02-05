import React, {useState} from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";


function SearchBox({onSearch, placeholder}) {
    const [searchParams, setSearchParams] = useState({});

    const handleSearch = e => {
        e.preventDefault();
        onSearch(searchParams);
        setSearchParams({});
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setSearchParams(prevSearchParams => ({
            ...prevSearchParams,
            [name]: value,
        }));
    };

    return (
        <div className="container my-3">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-10">
                    <form className="form-inline" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input 
                                className="form-control form-control-lg flex-grow-1"
                                type="text"
                                name={(placeholder === "Search Company...") ? "name" : "title"}
                                value={(placeholder === "Search Company...") ? searchParams.name :  searchParams.title}
                                onChange={handleChange}
                                placeholder={placeholder || "Search..."}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-lg btn-secondary" type="submit">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SearchBox;