import { defineConfig } from "vitepress";
import {
    groupIconMdPlugin,
    groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

export default defineConfig({
    title: "Openify",
    description: "方便React弹窗组件使用的工具",
    lang: "zh-Hans",
    base: "/openify/",
    lastUpdated: true,
    cleanUrls: true,
    markdown: {
        config(md) {
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            const fence = md.renderer.rules.fence!;
            md.renderer.rules.fence = (tokens, idx, options, env, self) => {
                return fence(tokens, idx, options, env, self).replace(
                    '<button title="Copy Code" class="copy"></button>',
                    `<button title="复制代码" class="copy"></button>`,
                );
            };
            md.use(groupIconMdPlugin);
        },
    },
    themeConfig: {
        sidebar: [
            { text: "什么是openify", link: "/guides/introduction" },
            { text: "快速开始", link: "/guides/quick-start" },
            { text: "更多例子", link: "/guides/examples" },
            { text: "API", link: "/guides/apis" },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/asurance/openify" },
        ],
        docFooter: {
            prev: "上一页",
            next: "下一页",
        },

        outline: {
            label: "页面导航",
        },

        lastUpdated: {
            text: "最后更新于",
            formatOptions: {
                dateStyle: "short",
                timeStyle: "medium",
            },
        },
        returnToTopLabel: "回到顶部",
        sidebarMenuLabel: "菜单",
        darkModeSwitchLabel: "主题",
        lightModeSwitchTitle: "切换到浅色模式",
        darkModeSwitchTitle: "切换到深色模式",
        skipToContentLabel: "跳转到内容",
        search: {
            provider: "local",
            options: {
                translations: {
                    button: {
                        buttonText: "搜索文档",
                        buttonAriaLabel: "搜索文档",
                    },
                    modal: {
                        noResultsText: "无法找到相关结果",
                        resetButtonTitle: "清除查询条件",
                        footer: {
                            selectText: "选择",
                            navigateText: "切换",
                        },
                    },
                },
            },
        },
    },
    vite: {
        plugins: [groupIconVitePlugin()],
    },
});
