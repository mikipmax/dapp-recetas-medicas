import React from "react";

const footer= (props) => {
    return <footer className="footer bg-dark rounded-top text-center">
        <div className="container py-2">
            <p className="text-white my-2">
                &copy; {props.autor}
            </p>
        </div>
    </footer>
}
export default footer
