export class PlaylistPage {
  constructor(page) {
    this.page = page;

    // LOCATORS
    this.searchInput = page.getByLabel('Search');
    this.trackList = page.locator('#tracklist');
    this.trackTitles = page.locator('#tracklist p');
    this.addButtons = page.getByRole('button', { name: '+' });
    this.playlistDuration = page.locator('#playlist-duration');
  }

  // Actions

  async open() {
    await this.page.goto('/');
  }

  async searchTrack(text) {
    await this.searchInput.fill(text);
  }

  async addTrackByIndex(index) {
    await this.addButtons.nth(index).click();
  }

  async getVisibleTrackTitles() {
    return this.trackTitles.allTextContents();
  }

  async getPlaylistDurationText() {
    return this.playlistDuration.textContent();
  }
}


