import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Openify",
    description: "方便React弹窗组件使用的工具",
    lang: "zh-CN",
    base: "/openify/",
    cleanUrls: true,
    themeConfig: {
        sidebar: [
            { text: "什么是openify", link: "/introduction" },
            { text: "快速开始", link: "/quick-start" },
            { text: "更多例子", link: "/examples" },
            { text: "API", link: "/apis" },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/asurance/openify" },
        ],
        search: {
            provider: "local",
        },
    },
});
