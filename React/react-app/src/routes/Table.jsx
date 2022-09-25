import React from "react";
import { Outlet, Link } from "react-router-dom";
import List from "../components/List";

class Table extends React.Component {
    render() {
        return (
            <div>
                <Link to="/table/1">Item</Link>
                <List />
                <Outlet />
            </div>
        );
    }
}

export default Table;