### 创建Vue3项目的方法

01. 通过Vue-Cli创建
    ```
        vue create <project-name>
        cd <project-name>
        npm run serve
    ```
    根据提示可以选择Vue2.0或者Vue3.0以及其他需要的配置,比如TypeScript等,空格为选择,回车为下一步.

02. 通过Vite创建
    ```
        npm init vite-app <project-name> / npm create vite@latest
        cd <project-name>
        npm install
        npm run dev
    ```

03. 其他方式创建
    ```
        npm init vue@3
        cd <project-name>
        npm install
        npm run lint
        npm run dev
    ```