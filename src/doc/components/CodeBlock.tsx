import { useRequest } from "ahooks";
import { Spin } from "antd";
import { Pre, highlight } from "codehike/code";
import { tokenTransitions } from "./SmoothPre";

export type CodeBlockProps = {
    code: string;
    lang?: string;
};

const CodeBlock = ({ code, lang = "typescript" }: CodeBlockProps) => {
    const highlightCode = useRequest(
        () =>
            highlight(
                {
                    value: code,
                    lang,
                    meta: "",
                },
                "github-light",
            ),
        {
            refreshDeps: [code, lang],
        },
    );
    return (
        <Spin spinning={highlightCode.loading}>
            {highlightCode.data && (
                <Pre code={highlightCode.data} handlers={[tokenTransitions]} />
            )}
        </Spin>
    );
};

export default CodeBlock;
