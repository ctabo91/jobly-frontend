import React, { useContext } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";


function Home() {
    const { currentUser, user } = useContext(CurrentUserContext);

    return (
        <div className="Home mt-5 pt-5">
            <h1 className="display-1 text-center pt-5">
                {!currentUser ? "Welcome To Jobly!"
                              : 
                              `Welcome ${currentUser.firstName}!`}
            </h1>
        </div>
    );
}

export default Home;