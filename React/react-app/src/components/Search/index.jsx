import React from "react";
import "./index.css";

// 可以命名为 index.jsx, index.css 或者 Search.jsx, Search.css
// 区别在于使用 index 命名, 可以省略一层引入路径, 好看一点

class Search extends React.Component {
    render() {
        return (
            <div>
                <input id="search-input" type="text" />
                <button onClick={this.FetchData}>click to fetch</button>
            </div>
        );
    }

    FetchData = async () => {
        // fetch 的用法
        try {
            const resp = await fetch("http://120.26.93.147:9090");
            const data = await resp.json();
            console.log(data);
        }
        catch (e) {
            console.error(e);
        }
    };
}

export default Search;