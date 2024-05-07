import { moduleTools, defineConfig } from '@modern-js/module-tools';
import { modulePluginDoc } from '@modern-js/plugin-rspress';

export default defineConfig({
  plugins: [
    moduleTools(),
    modulePluginDoc({
      doc: {
        title: 'openify',
        base: '/openify/',
      },
    }),
  ],
  buildPreset: 'npm-library',
});
