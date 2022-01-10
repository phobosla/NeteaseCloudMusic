export type State = {
  musicDetailOptions: MusicDetailOptions;
  songSheetDetail: unknown;
  collectSong: {
    visible: boolean;
    songIds: string;
  };
  playMusicId: number;
  playMusicList: unknown;
  playMusicItem: PlayMusicItem;
  musicPlayProgress: unknown;
  musicPlayStatus: unknown;
  musicAudioLock: boolean;
  musicModeType: number;
  musicVolume: number;
  playLyrics: unknown;
};

export type MusicDetailOptions = {
  subPlayList: boolean;
  MyVideo: boolean;
  playListDetail: boolean;
};

export type PlayMusicItem = {
  id: number; // 歌曲id
  name: string; // 歌手name
  picUrl: string; // 头像
  time: number; // 时长
  mv: number; // mv数量
  singerList: {
    id: string; // 歌手id
    name: string; // 歌手name
  }[];
  targetType?: string; // 来源（歌单/专辑/单曲等）
  targetId?: number; // 来源id
};

// 本地存储容错处理
function faultTolerant(name: string) {
  if (localStorage.getItem(name) as string) {
    return JSON.parse(localStorage.getItem(name) as string);
  }
}

const state: State = {
  musicDetailOptions: {
    subPlayList: false,
    MyVideo: false,
    playListDetail: false
  }, // 我的音乐 - 详情显示
  songSheetDetail: faultTolerant('songSheetDetail') || {}, // 歌单详情数据
  collectSong: {
    visible: false,
    songIds: ''
  }, // 收藏歌曲
  playMusicId: Number(localStorage.getItem('playMusicId')) || 0, // 当前播放音乐id
  playMusicItem: faultTolerant('playMusicItem') || {}, // 当前播放音乐数据
  playMusicList: faultTolerant('playMusicList') || [], // 播放列表数据
  musicPlayProgress: {}, // 当前播放音乐进度数据
  musicPlayStatus: {
    look: false,
    loading: false,
    refresh: false
  }, // 我的音乐 - 播放状态
  musicAudioLock: faultTolerant('musicAudioLock') || false, // 播放器锁定在底部
  musicModeType: Number(localStorage.getItem('musicModeType')) || 0, // 播放器 - 播放模式
  musicVolume: Number(localStorage.getItem('musicVolume')) || 1, // 播放器 - 音量
  playLyrics: faultTolerant('playLyrics') || [] // 播放器 - 播放歌词
};

export default state;
