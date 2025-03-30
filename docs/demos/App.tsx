import { Button, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { Slot } from "openify";
import React from "react";
import { slotId } from "./utils";

const App = () => (
    <ConfigProvider locale={zhCN}>
        <Slot id={slotId} />
    </ConfigProvider>
);

export default App;
