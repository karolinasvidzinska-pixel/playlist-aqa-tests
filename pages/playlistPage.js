export class PlaylistPage {
  constructor(page) {
    this.page = page;

    this.searchInput = page.getByLabel('Search');
    this.trackTitles = page.locator('#tracklist p');
    this.addButtons = page.getByRole('button', { name: '+' });
    this.playlistDuration = page.locator('#playlist-duration');
    this.trackRows = page.locator('#tracklist .MuiGrid-container');
  }

  async open() {
    await this.page.goto('/');
  }

  async search(track) {
    await this.searchInput.fill(track);
  }

  async getFirstTrackTitle() {
    return this.trackTitles.first().textContent();
  }

  async addTrackByIndex(index) {
    await this.addButtons.nth(index).click();
  }

  async getTrackDurationByIndex(index) {
    return this.trackRows
      .nth(index)
      .locator('.MuiGrid-grid-xs-2 p')
      .textContent();
  }

  async getTotalDuration() {
    return this.playlistDuration.textContent();
  }
}


