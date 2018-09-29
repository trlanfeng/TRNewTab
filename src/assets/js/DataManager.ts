/**
 * 数据管理类，用来获取或修改配置及快速拨号
 */
class DataManager {
    public static readonly Instance: DataManager = new DataManager();
    private currentData: SettingData;
    private defaultData: SettingData;
    /**
     * 获取搜索引擎URL
     */
    get searchUrl(): string {
        return this.currentData.searchUrl;
    }
    /**
     * 获取是否显示搜索框
     */
    get isSearchOpen(): boolean {
        return this.currentData.isSearchOpen;
    }
    private constructor() {
        this.defaultData = {
            list: [],
            isSearchOpen: true,
            bgType: 0,
            bingApiUrl:
                "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US",
            bgUrl: "",
            searchUrl: "https://www.baidu.com/s?wd=",
            searchIcon: "https://www.baidu.com/favicon.ico",
            searchTitle: "百度",
            bgLastCheckDate: 0
        };
        this.loadData();
    }
    /**
     * 使用默认设置初始化数据
     */
    public initData(): void {
        this.currentData = JSON.parse(JSON.stringify(this.defaultData));
    }
    /**
     * 从网络同步内容中加载数据
     */
    public loadData(): void {
        this.currentData = {
            bgLastCheckDate: 14,
            bgType: 0,
            bgUrl:
                "https://www.bing.com/az/hprichbg/rb/GrevysZebra_ZH-CN8656523429_1920x1080.jpg",
            bingApiUrl:
                "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US",
            isSearchOpen: true,
            list: [
                {
                    name:
                        "游民星空 - 大型单机游戏媒体 提供极具特色单机游戏资讯、下载",
                    url: "http://www.gamersky.com/"
                },
                {
                    name: "开源中国 - 找到您想要的开源项目，分享和交流",
                    url: "http://www.oschina.net/"
                },
                {
                    name: "cnBeta.COM - 中文业界资讯站",
                    url: "https://www.cnbeta.com/"
                },
                {
                    name:
                        "人人影视,字幕组下载站|为您翻译最新最快的海外影视剧,ZiMuZu.tv",
                    url: "http://www.zimuzu.tv/"
                },
                {
                    name:
                        "幻蓝博客 – 孤月蓝风 | 追寻互联网科技、Unity开发、AR/VR开发、游戏开发、Web前后端开发等技术。",
                    url: "https://fengyu.name/"
                },
                {
                    name: "Facebook",
                    url: "https://www.facebook.com/"
                },
                {
                    name: "Twitter",
                    url: "https://twitter.com/"
                },
                {
                    name: "Video Games Reviews & News - GameSpot",
                    url: "https://www.gamespot.com/"
                },
                {
                    name: "Hottest Game News & Rumors | N4G",
                    url: "http://n4g.com/"
                },
                {
                    name:
                        "GameZone - Video Game News, Reviews, Originals and More",
                    url: "https://www.gamezone.com/"
                },
                {
                    name: "IGN中国版",
                    url: "http://www.ign.xn--fiqs8s/"
                },
                {
                    name: "Home - BBC News",
                    url: "http://www.bbc.com/news"
                },
                {
                    name: "Google News",
                    url: "https://news.google.com/news/?hl=en&gl=US&ned=us"
                },
                {
                    name: "掘金 - juejin.im - 一个帮助开发者成长的社区",
                    url: "https://juejin.im/"
                },
                {
                    name: "多邻国: 免费学习英语、西班牙语等多种语言",
                    url: "http://www.duolingo.cn/"
                },
                {
                    name: "InfoQ - 促进软件开发领域知识与创新的传播",
                    url: "http://www.infoq.com/cn"
                },
                {
                    name:
                        "Microsoft Virtual Academy — 为开发人员、IT 专业人员和数据专家提供免费的在线培训",
                    url: "https://mva.microsoft.com/"
                },
                {
                    name: "SegmentFault 思否",
                    url: "https://segmentfault.com/"
                },
                {
                    name: "reddit: the front page of the internet",
                    url: "https://www.reddit.com/"
                },
                {
                    name:
                        "Stack Overflow - Where Developers Learn, Share, & Build Careers",
                    url: "https://stackoverflow.com/"
                },
                {
                    name:
                        "Quora - A place to share knowledge and better understand the world.",
                    url: "https://www.quora.com/"
                },
                {
                    name: "Teambition・团队协作工具创导者",
                    url: "https://www.teambition.com/"
                },
                {
                    name: "腾讯课堂_专业的在线教育平台(ke.qq.com)",
                    url: "https://ke.qq.com/"
                },
                {
                    name:
                        "优设-UISDC: 优秀设计联盟-SDC-优设网-设计师交流学习平台-听讲座，聊设计，找素材，尽在优设网",
                    url: "https://www.uisdc.com/"
                },
                {
                    name: "MDN Web 文档",
                    url: "https://developer.mozilla.org/zh-CN/"
                },
                {
                    name: "神盾局 - 蓝湖",
                    url: "https://lanhuapp.com/web/#/item"
                },
                {
                    name:
                        "站酷 (ZCOOL) - 设计师互动平台 - 打开站酷，发现更好的设计！",
                    url: "http://www.zcool.com.cn/"
                },
                {
                    name: "动态 - 孤月蓝风 (trlanfeng) - 码云 Gitee.com",
                    url: "https://gitee.com/"
                },
                {
                    name: "爱范儿 · 让未来触手可及",
                    url: "https://www.ifanr.com/"
                },
                {
                    name: "IT之家 - 数码，科技，生活 - 软媒旗下",
                    url: "https://www.ithome.com/"
                },
                {
                    name: "TechWeb.com.cn - 领先的互联网消费互动媒体",
                    url: "http://www.techweb.com.cn/"
                },
                {
                    name: "Tech - The Verge",
                    url: "https://www.theverge.com/tech"
                },
                {
                    name: "Technology News - CNET News - CNET",
                    url: "https://www.cnet.com/news/"
                },
                {
                    name: "Engadget",
                    url: "https://www.engadget.com/"
                },
                {
                    name: "新浪科技_新浪网",
                    url: "http://tech.sina.com.cn/"
                },
                {
                    name: "墨刀 - 全部项目",
                    url: "https://pro.modao.cc/workspace/apps"
                },
                {
                    name:
                        "Metacritic - Movie Reviews, TV Reviews, Game Reviews, and Music Reviews",
                    url: "http://www.metacritic.com/"
                }
            ],
            searchIcon: "https://www.baidu.com/favicon.ico",
            searchTitle: "百度",
            searchUrl: "https://www.baidu.com/s?wd=",
            useBingImage: false
        };
    }
    /**
     * 保存数据到网络同步插件中
     */
    public saveData(): boolean {
        return false;
    }
    public getSpeedDialList(): SpeedDial[] {
        return this.currentData.list;
    }
    /**
     * 添加快速拨号内容
     * @param item 单项快速拨号内容
     */
    public addSpeedDial(item: SpeedDial): boolean {
        this.currentData.list.push(item);
        return false;
    }
    /**
     * 删除某项快速拨号
     * @param index 要删除的快速拨号索引项
     */
    public removeSpeedDial(index: number): boolean {
        this.currentData.list.splice(index, 1);
        return false;
    }
    /**
     * 根据键获取数据内容
     * @param name 数据键名称
     */
    public getSettingByName(name: string): any {
        return this.currentData[name];
    }
    /**
     * 显示搜索框
     */
    public showSearchEngine() {
        this.currentData.isSearchOpen = true;
    }
    /**
     * 隐藏搜索框
     */
    public hideSearchEngine() {
        this.currentData.isSearchOpen = false;
    }
    /**
     * 修改搜索引擎
     * @param settings 设置搜索引擎内容
     */
    public changeSearchEngine(settings: SearchEngineConfig) {
        this.currentData.searchUrl = settings.searchUrl;
        this.currentData.searchTitle = settings.searchTitle;
        this.currentData.searchIcon = settings.searchIcon;
    }
}

let DM = DataManager.Instance;

export default DM;
