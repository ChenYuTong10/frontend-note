import React from "react";
import list from "./index.module.css";

// 为了防止组件之间的样式污染, 可以将对应的 css 文件前加入module前缀
// 将其模块化, 并使用下面的方式将 css 类名等传递给组件即可, 或者使用less等其他方式解决

class List extends React.Component {
    render() {
        return (
            <div className={list.animals}>
                <ul>
                    <li>I am Dog</li>
                    <li>I am Cat</li>
                    <li>I am Pet</li>
                </ul>
            </div>
        );
    }
}

export default List;