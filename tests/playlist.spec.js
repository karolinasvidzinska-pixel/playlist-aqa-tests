const { test, expect } = require('../fixtures/fixtures');
const { TEST_DATA } = require('../testData/playlistTestData');
const { convertToSeconds } = require('../helpers/time.helper');


test.describe('Playlist Tests', () => {
  test.beforeEach(async ({ playlistPage }) => {
    await playlistPage.open();
  });

  test('Search filters tracks correctly', async ({ playlistPage }) => {
    await playlistPage.search(TEST_DATA.searchTrack);

    const firstTrack = await playlistPage.getFirstTrackTitle();
    expect(firstTrack).toContain(TEST_DATA.expectedTrack);
  });

  test('Add track using + button', async ({ playlistPage }) => {
    await playlistPage.addTrackByIndex(0);

    const total = await playlistPage.getTotalDuration();
    expect(total).not.toBe('No tracks on playlist');
  });

  test('Total duration is calculated correctly in seconds', async ({ playlistPage }) => {
    let expectedTotal = 0;

    for (let i = 0; i < TEST_DATA.tracksToAdd.length; i++) {
      const duration = await playlistPage.getTrackDurationByIndex(i);
      expectedTotal += convertToSeconds(duration);
      await playlistPage.addTrackByIndex(i);
    }

    const uiTotal = await playlistPage.getTotalDuration();
    expect(Number(uiTotal)).toBe(expectedTotal);
  });
});



