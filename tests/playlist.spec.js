import { test, expect } from '@playwright/test';
import { PlaylistPage } from '../pages/playlistPage.js';

// TEST DATA
const TEST_DATA = {
  searchTrack: 'Summer',
  expectedTrack: 'Summer Breeze',
  tracksToAdd: [
    { name: 'Summer Breeze', duration: '03:35' }, // 215 sec
    { name: 'Autumn Leaves', duration: '03:00' }, // 180 sec
  ],
};

// UTILITY FOR TRANSLATING "mm:ss" → seconds
function convertToSeconds(time) {
  const [minutes, seconds] = time.split(':').map(Number);
  return minutes * 60 + seconds;
}

test.describe('Playlist App Tests (Page Object)', () => {
  let playlistPage;

  test.beforeEach(async ({ page }) => {
    playlistPage = new PlaylistPage(page);
    await playlistPage.open(); //  baseURL тянется из playwright.config.js
  });

  //  1. SEARCH
  test('Search filters tracks correctly', async () => {
    await playlistPage.searchTrack(TEST_DATA.searchTrack);

    const titles = await playlistPage.getVisibleTrackTitles();

    expect(titles.some(title => title.includes(TEST_DATA.expectedTrack))).toBeTruthy();
  });

  //  2. ADD TRACK
  test('Add track to playlist using + button', async () => {
    await playlistPage.addTrackByIndex(0);

    const durationText = await playlistPage.getPlaylistDurationText();

    expect(durationText).not.toBe('No tracks on playlist');
  });

  //  3. VERIFY TOTAL DURATION 
  test('Verify total duration is calculated correctly in seconds', async () => {
    await playlistPage.addTrackByIndex(0);
    await playlistPage.addTrackByIndex(1);

    const expectedTotal = TEST_DATA.tracksToAdd
      .map(track => convertToSeconds(track.duration))
      .reduce((a, b) => a + b, 0);

    const actualText = await playlistPage.getPlaylistDurationText();

    expect(Number(actualText)).toBe(expectedTotal);
  });
});


