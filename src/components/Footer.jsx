import React from "react";

const Footer = ({autor}) => {
    return (<><br/>
        <div className="footer bg-dark text-center">
            <p className="text-white my-3">
                &copy; {autor}
            </p>
        </div>
    </>);
}
export default Footer
