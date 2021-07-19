import React from "react";

const Footer = ({autor}) => {
    return (<nav className="navbar  navbar-dark bg-dark ">
            <div className="container-fluid py-4">
              <p className="text-white my-2 footer">
                    &copy; {autor}
                </p>
            </div>
        </nav>
    );
}
export default Footer
