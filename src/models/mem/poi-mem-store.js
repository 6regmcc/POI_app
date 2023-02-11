import { v4 } from "uuid";

let pois = [];

export const poiMemStore = {
  /*
  async getAllPlaylists() {
    return playlists;
  },

  */
  async getAllPois() {
    return pois;
  },
  /*
  async addPlaylist(playlist) {
    playlist._id = v4();
    playlists.push(playlist);
    return playlist;
  },
  */

  async addPoi(poi) {
    poi._id = v4();
    pois.push(poi);
    return poi;
  },

  /*
  async getPlaylistById(id) {
    return playlists.find((playlist) => playlist._id === id);
  },

   */

  async getPoiById(id) {
    return pois.find((poi) => poi._id === id);
  },

  /*
  async deletePlaylistById(id) {
    const index = playlists.findIndex((playlist) => playlist._id === id);
    playlists.splice(index, 1);
  },
  */

  async deletePoiById(id) {
    const index = pois.findIndex((poi) => poi._id === id);
    pois.splice(index, 1);
  },

  async deleteAllPois() {
    pois = [];
  },
};
