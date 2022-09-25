import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

// 使用两个函数 useParams, useSearchParams 可以分别获取到 params 参数和 query 参数
// 还有一个 setSearchParams 函数用于更改 search 参数

// 还有一个state参数, 可以不改变 params 和 search 参数

// 编程式路由导航 useNavigate

class Item extends React.Component {
    render() {
        return (
            <div>
                <p>Item Id: 1</p>
                {/* <p>Item Id: {params.id}</p> */}
            </div>
        );
    }
}

export default Item;