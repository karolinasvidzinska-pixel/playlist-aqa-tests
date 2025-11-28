import { test as base, expect } from '@playwright/test';
import { PlaylistPage } from '../pages/playlistPage';

export const test = base.extend({
  playlistPage: async ({ page }, use) => {
    const playlistPage = new PlaylistPage(page);
    await use(playlistPage);
  },
});

export { expect };

