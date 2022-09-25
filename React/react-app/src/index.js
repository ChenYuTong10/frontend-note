// 项目的入口文件

import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from "./routes/Home";
import Table from "./routes/Table";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate, useRoutes } from 'react-router-dom';
import Item from './routes/Item';

// 懒加载
// const Home = lazy(() => import("./routes/Home"));
// const Table = lazy(() => import("./routes/Table"));

const routes = useRoutes([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
// React.StrictMode 可以检查App及其子组件的使用是否契合当前React的版本
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 使用路由表创建路由 */}
      {/* {routes} */}
      <Routes>
        <Suspense fallback={<h1>waiting</h1>}>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="table" element={<Table />}>
              <Route
                index
                element={<p>Fill Empty</p>}
              />
              {/* params 传递参数 */}
              <Route path=":id" element={<Item />}></Route>
            </Route>
            {/* 配置匹配不到的路径 */}
            <Route path="*"
              element={
                <div>
                  <p>nothing here</p>
                </div>
              }
            ></Route>
          </Route>
        </Suspense>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
