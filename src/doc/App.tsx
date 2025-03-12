import { Radio } from "antd";
import { useState } from "react";
import CodeBlock from "./components/CodeBlock";
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
        </div>
    );
};

export default App;
