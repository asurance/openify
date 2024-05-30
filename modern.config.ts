import { moduleTools, defineConfig } from '@modern-js/module-tools';
import { modulePluginDoc } from '@modern-js/plugin-rspress';

export type { UserConfigExport } from '@modern-js/core';

export default defineConfig({
  plugins: [
    moduleTools(),
    modulePluginDoc({
      doc: {
        title: 'openify',
        base: '/openify/',
        themeConfig: {
          socialLinks: [
            {
              icon: 'github',
              mode: 'link',
              content: 'https://github.com/openify/openify',
            },
          ],
        },
      },
    }),
  ],
  buildPreset: 'npm-library',
});
