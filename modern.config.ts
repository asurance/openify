import { moduleTools, defineConfig } from '@modern-js/module-tools';
import { modulePluginDoc } from '@modern-js/plugin-rspress';

export type { UserConfigExport } from '@modern-js/core';

export default defineConfig({
  plugins: [
    moduleTools(),
    modulePluginDoc({
      doc: {
        title: 'openify',
        description: '方便React弹窗类使用的工具',
        base: '/openify/',
        markdown: {
          showLineNumbers: true,
        },
        themeConfig: {
          darkMode: true,
          enableContentAnimation: true,
          enableScrollToTop: true,
          socialLinks: [
            {
              icon: 'github',
              mode: 'link',
              content: 'https://github.com/asurance/openify',
            },
          ],
        },
      },
    }),
  ],
  buildPreset: 'npm-library',
});
