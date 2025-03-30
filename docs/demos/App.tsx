import { Button, ConfigProvider } from "antd";
import { Slot } from "openify";
import React from "react";
import { slotId } from "./utils";
import zhCN from "antd/locale/zh_CN";

const App = () => (
    <ConfigProvider locale={zhCN}>
        <Slot id={slotId} />
    </ConfigProvider>
);

export default App;
