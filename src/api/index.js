import { get } from '../utils/request.js';

const api = {
  getMusic(id, limit = 9) {
    return get('/api/personalized/newsong', {
      id,
      limit,
    });
  },
  getHotList({ limit = 9 } = {}) {
    return get('/api/personalized', {
      limit,
    });
  },
  getNewList(cat, offset, limit) {
    // 网友精选
    return get('/api/top/playlist', {
      cat,
      limit,
      offset,
    });
  },
  getNewListCategory() {
    return get('/api/playlist/catlist');
  },
  getNiceList() {
    return get('/api/top/playlist/highquality/tags');
  },
  getMv() {
    return get('/api/personalized/mv');
  },
  getNewSong(type = 0) {
    return get('/api/top/song', {
      type,
    });
  },
  getNewMV(limit = 6) {
    return get('/api/mv/first', {
      limit,
    });
  },
  getAllMV(area, type, order, limit = 50, offset) {
    return get('/api/mv/all', {
      area,
      type,
      order,
      limit,
      offset,
    });
  },
  getNewAlbum() {
    //最新专辑
    return get('/api/album/newest');
  },
  getAllAlbum(area, type, year, month) {
    return get('/api/top/album', {
      area,
      type,
      year,
      month,
    });
  },
  getVideo() {
    return get('/api/toplist');
  },
  getHotSearch() {
    return get('/api/search/hot/detail');
  },
  getList() {
    return get('/api/toplist/detail');
  },
  getAlbumDetail(id) {
    return get('/api/album', {
      id,
    });
  },
  getAlbumComment(id, offset) {
    return get('/api/comment/album', {
      id,
      offset,
      limit: 10,
    });
  },
  getHotSinger(offset) {
    return get('/api/top/artists', {
      limit: 18,
      offset,
    });
  },
  getSingerDetail(id) {
    // artists 官网是artist
    return get('/api/artists/detail', {
      id,
    });
  },
  getAllSinger(limit = 100, type = 2, area = 7) {
    return get('/api/artist/list', {
      limit,
      area,
      type,
    });
  },
  getAllSongs(id, limit = 500) {
    // 官网是artist/songs  但是并不是全部的
    return get('/api/artists/songs', {
      id,
      limit,
    });
  },
  getSingerMv(id) {
    return get('/api/artist/mv', {
      id,
    });
  },
  getSingerAlbum(id) {
    return get('/api/artist/album', {
      id,
    });
  },
  search(params, type, offset = 0) {
    // search?keywords=海阔天空
    var str = '/api/search?keywords=' + params;
    return get(str, {
      limit: 30,
      type,
      offset,
    });
  },
  SongDetail(ids) {
    return get('/api/song/detail', {
      ids,
    });
  },
  banners() {
    return get('/api/banner');
  },
  toSong(id) {
    return get(`/api/song/url?id=${id}&realIP=116.25.146.177`);
  },
  toMv(id) {
    return get('/api/mv/url', {
      id,
    });
  },
  MvDetail(mvid) {
    return get('/api/mv/detail', {
      mvid,
    });
  },
  getSimiMv(mvid) {
    return get('/api/simi/mv', {
      mvid,
    });
  },
  getArtistInfo(id) {
    return get('/api/artists', {
      id,
    });
  },
  playLists(id) {
    return get('/api/playlist/subscribers', {
      id,
    });
  },
  playList(id) {
    return get('/api/playlist/detail', {
      id,
    });
  },
  hotcomment(id) {
    return get('/api/comment/hot', {
      type: 2,
      id,
    });
  },
  newcomment(id, offset) {
    return get('/api/comment/playlist', {
      id,
      limit: 6,
      offset: offset,
    });
  },
  mv_comment(id, offset) {
    return get('/api/comment/mv', {
      id,
      offset,
      limit: 6,
    });
  },
};
export default api;
