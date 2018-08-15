/**
 * 快速拨号内容数据结构
 */
interface SpeedDial {
  /**
   * 网站名称
   */
  name: string;
  /**
   * 网站地址
   */
  url: string;
}
/**
 * 设置的数据结构
 */
interface SettingData {
  /**
   * 快速拨号列表
   */
  list: SpeedDial[];
  /**
   * 是否开启搜索
   */
  isSearchOpen: boolean;
  /**
   * 背景类型
   */
  bgType: BgType;
  /**
   * Bing壁纸接口
   */
  bingApiUrl: string;
  /**
   * 网络图片背景URL地址
   */
  bgUrl: string;
  /**
   * 搜索字符串URL
   */
  searchUrl: string;
  /**
   * 搜索图标URL地址
   */
  searchIcon: string;
  /**
   * 搜索引擎显示名称
   */
  searchTitle: string;
  /**
   * 壁纸最后更新日期，为年月日中的日
   */
  bgLastCheckDate: number;
  /**
   * 是否使用必应图片
   */
  useBingImage?: boolean;
}
/**
 * 
 */
enum BgType {
  /**
   * 必应背景
   */
  Bing = 1,
  /**
   * 网络图片背景
   */
  Url = 2,
  /**
   * 本地文件背景
   */
  Local = 3
}
/**
 * 搜索引擎设置数据结构
 */
interface SearchEngineConfig {
  searchUrl: string;
  searchIcon: string;
  searchTitle: string;
}