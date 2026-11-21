import { type HeadConfig, defineConfig } from "vitepress";
import {
    groupIconMdPlugin,
    groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

const siteUrl = "https://asurance.github.io/openify/";
const siteName = "Openify";
const siteDescription =
    "Openify 是一个简化 React 弹窗类组件调用的工具,支持全局唤起、Promise 化结果、渲染隔离与异常捕获,仅依赖 React,兼容任意组件库。";

const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    programmingLanguage: "TypeScript",
    runtimePlatform: "React",
    license: "https://opensource.org/licenses/MIT",
    codeRepository: "https://github.com/asurance/openify",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "CNY",
    },
};

export default defineConfig({
    title: siteName,
    titleTemplate: `:title · ${siteName}`,
    description: siteDescription,
    lang: "zh-Hans",
    base: "/openify/",
    lastUpdated: true,
    cleanUrls: true,
    head: [
        [
            "meta",
            {
                name: "keywords",
                content:
                    "openify,react,弹窗,弹窗组件,modal,弹窗调用,promise弹窗,react组件库",
            },
        ],
        ["meta", { name: "author", content: "asurance" }],
        ["meta", { name: "robots", content: "index, follow" }],
        ["meta", { name: "theme-color", content: "#3451b2" }],
        [
            "script",
            {
                async: "",
                src: "https://www.googletagmanager.com/gtag/js?id=G-G394DY8K0H",
            },
        ],
        [
            "script",
            {},
            `  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-G394DY8K0H');`,
        ],
    ],
    transformHead({ pageData }) {
        // index.md -> "", guides/index.md -> "guides/", guides/apis.md -> "guides/apis"
        const path = pageData.relativePath
            .replace(/(^|\/)index\.md$/, "$1")
            .replace(/\.md$/, "");
        const url = `${siteUrl}${path}`;
        const pageTitle = pageData.frontmatter.title ?? pageData.title;
        const title = pageTitle ? `${pageTitle} · ${siteName}` : siteName;
        const description = pageData.frontmatter.description ?? siteDescription;

        const head: HeadConfig[] = [
            ["link", { rel: "canonical", href: url }],
            ["meta", { property: "og:type", content: "website" }],
            ["meta", { property: "og:site_name", content: siteName }],
            ["meta", { property: "og:locale", content: "zh_CN" }],
            ["meta", { property: "og:title", content: title }],
            ["meta", { property: "og:description", content: description }],
            ["meta", { property: "og:url", content: url }],
            ["meta", { name: "twitter:card", content: "summary" }],
            ["meta", { name: "twitter:title", content: title }],
            ["meta", { name: "twitter:description", content: description }],
        ];

        if (pageData.relativePath === "index.md") {
            head.push([
                "script",
                { type: "application/ld+json" },
                JSON.stringify(structuredData),
            ]);
        }

        return head;
    },
    sitemap: {
        hostname: siteUrl,
    },
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
