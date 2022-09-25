import './App.css';
import React, { Fragment } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

function App() {
  return (
    // Fragment 相当于Vue中的template, 不会生成真正的节点
    // 且只能拥有key属性, 还有其他方法也可以像这个标签一样: <></>
    <Fragment key="1">
      <h1>Router</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/home">Home</Link> |{" "}
        <Link to="/table">Table</Link>
        {/* 如果需要点击高亮, 那么使用NavLink, 他会在激活时给元素加上active类名
          当然, 如果需要自定义激活类名, 需要将className写成一个函数
        */}
        <NavLink className={(o) => o.isActive ? "myactive" : ""} to="/home">Nav Home</NavLink>
        <NavLink to="/table">Nav Home</NavLink>
      </nav>
      {/* Outlet 类似于 Vue中的 router-view */}
      <Outlet />
    </Fragment>
  );
}

export default App;
