import { Button, message, Radio } from "antd";
import { useState } from "react";
import CodeBlock from "./components/CodeBlock";
import { Slot } from "openify";
import { OpenableNormalModal, OpenableSimpleModal } from "./OpenableModal";
import { openableNormalDrawer } from "./NormalDrawer";
const cmdMap = {
    npm: "npm install openify",
    yarn: "yarn add openify",
    pnpm: "pnpm add openify",
};
const App = () => {
    const [current, setCurrent] = useState<keyof typeof cmdMap>("npm");
    return (
        <div>
            <div>Welcone to Openify</div>
            <Radio.Group
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
            >
                <Radio.Button value="npm">npm</Radio.Button>
                <Radio.Button value="yarn">yarn</Radio.Button>
                <Radio.Button value="pnpm">pnpm</Radio.Button>
            </Radio.Group>
            <CodeBlock code={cmdMap[current]} lang="bash" />
            <div>快速开始</div>
            <div>设计目标</div>
            <div>为什么需要openify</div>
            <div>更多例子</div>
            <Button
                onClick={async () => {
                    const res = await Slot.getById("root").open(
                        OpenableNormalModal,
                        {
                            id: "123",
                        },
                    );
                    message.success(`弹窗返回: ${res}`);
                }}
            >
                测试
            </Button>

            <Button
                onClick={async () => {
                    await Slot.getById("root").open(OpenableSimpleModal);
                }}
            >
                测试2
            </Button>

            <Button
                onClick={async () => {
                    await Slot.getById("root").open(openableNormalDrawer, {
                        id: "234",
                    });
                }}
            >
                测试3
            </Button>
            <Slot id="root" />
        </div>
    );
};

export default App;
