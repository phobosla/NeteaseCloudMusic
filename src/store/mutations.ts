import Router from '@router/index';
import { State } from '@store/state';
import { clearAllCookie } from '@utils/cookie';

type Mutations<T, U = any> = {
  [key: string]: (state: T, payload: U) => void;
};

type Message = {
  type: string;
  title: string;
  time?: number;
};

const mutations: Mutations<State> = {
  // 头部导航选中
  setHeaderActiveIndex(state, index: number) {
    state.heaerActiveIndex = index;
    localStorage.setItem('heaerActiveIndex', index.toString());
  },
  // 二级导航选中
  setSubActiveIndex(state, index: number) {
    state.subActiveIndex = index;
    localStorage.setItem('subActiveIndex', index.toString());
  },
  // 登录对话框
  setLoginDialog(state, bool: boolean) {
    state.loginDialog = bool;
  },
  // 用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo as unknown;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    // 是否登录
    state.isLogin = true;
    localStorage.setItem('isLogin', JSON.stringify(true));
  },
  // 用户cookie
  setCookie(state, cookie) {
    state.cookie = cookie as string;
    localStorage.setItem('cookie', JSON.stringify(cookie));
  },
  // 消息提示
  setMessage(state, message: Message) {
    return new Promise(resolve => {
      const params = Object.assign({ time: 1000 }, message);
      state.message = params;
      resolve('');
    });
  },
  // 搜索关键字
  setSearchText(state, searchText: string) {
    state.searchText = searchText;
  },
  // 搜索详情关键字
  setSearchDetailText(state, searchDetailText: string) {
    state.searchDetailText = searchDetailText;
    localStorage.setItem('searchDetailText', JSON.stringify(searchDetailText));
  },
  // 歌单id
  setSongSheetId(state, songSheetId: number) {
    state.songSheetId = songSheetId;
    localStorage.setItem('songSheetId', JSON.stringify(songSheetId));
  },
  // 歌手id
  setSingerId(state, singerId: number) {
    state.singerId = singerId;
    localStorage.setItem('singerId', JSON.stringify(singerId));
    // 重置歌手详情tab
    state.singerTabIndex = 0;
    localStorage.setItem('singerTabIndex', JSON.stringify(0));
  },
  // 电台节目id
  setDjprogramId(state, djprogramId: number) {
    state.djprogramId = djprogramId;
    localStorage.setItem('djprogramId', JSON.stringify(djprogramId));
  },
  // 视频/mv 数据
  setVideo(state, video) {
    state.video = video;
    localStorage.setItem('video', JSON.stringify(video));
  },
  // 跳转歌曲详情
  jumpSongDetail(state, songId: number) {
    // 取消二级导航选中
    state.subActiveIndex = -1;
    localStorage.setItem('subActiveIndex', '-1');

    state.songId = songId;
    localStorage.setItem('songId', JSON.stringify(songId));

    Router.push({ name: 'song-detail', params: { songId } });
  },
  // 跳转歌单详情
  jumpSongSheetDetail(state, songSheetId: number) {
    state.songSheetId = songSheetId;
    localStorage.setItem('songSheetId', JSON.stringify(songSheetId));

    Router.push({ name: 'song-sheet-detail', params: { songSheetId } });
  },
  // 跳转歌手详情
  jumpSingerDetail(state, singerId: number) {
    // 取消二级导航选中
    state.subActiveIndex = -1;
    localStorage.setItem('subActiveIndex', '-1');

    state.singerId = singerId;
    localStorage.setItem('singerId', JSON.stringify(singerId));
    // 重置歌手详情tab
    state.singerTabIndex = 0;
    localStorage.setItem('singerTabIndex', JSON.stringify(0));

    Router.push({ name: 'singer-detail', params: { singerId } });
  },
  // 跳转专辑详情
  jumpAlbumDetail(state, albumId: number) {
    state.albumId = albumId;
    localStorage.setItem('albumId', JSON.stringify(albumId));

    Router.push({ name: 'album-detail', params: { albumId } });
  },
  // 跳转用户资料
  jumpUserProfile(state, userId: number) {
    // 头部导航取消选中
    state.heaerActiveIndex = -1;
    localStorage.setItem('heaerActiveIndex', '-1');

    state.userId = userId;
    localStorage.setItem('userId', JSON.stringify(userId));

    Router.push({ name: 'user-profile', params: { userId } });
  },
  // 歌手详情tab
  setSingerTabIndex(state, singerTabIndex: number) {
    state.singerTabIndex = singerTabIndex;
    localStorage.setItem('singerTabIndex', JSON.stringify(singerTabIndex));
  },
  // 搜索详情tab
  setSearchIndex(state, searchIndex: number) {
    state.searchIndex = searchIndex;
    localStorage.setItem('searchIndex', JSON.stringify(searchIndex));
  },
  // 签到
  setSignIn(state, signIn: boolean) {
    const userInfo = JSON.parse(JSON.stringify(state.userInfo));
    userInfo.pcSign = signIn;
    state.userInfo = userInfo as unknown;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  },
  // 退出登录
  setLogout(state) {
    state.isLogin = false;
    // 清除用户信息
    state.userInfo = {};
    // 清除所有本地存储
    localStorage.clear();
    // 清除所有cookie
    clearAllCookie();
  },
  // 当前播放音乐进度数据
  setVideoPlayProgress(state, playProgress) {
    const videoPlayProgress = JSON.parse(
      JSON.stringify(state.videoPlayProgress)
    );
    const progress = Object.assign(videoPlayProgress, playProgress);
    state.videoPlayProgress = progress as unknown;
  }
};

export default mutations;
