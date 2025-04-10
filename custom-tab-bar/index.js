Component({
  data: {
    selected: 0,
    color: "#7D7D7D",
    selectedColor: "#F5CBA7",
    backgroundColor: "#FFFFFF",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/icons/home.png",
        selectedIconPath: "/icons/home_selected.png"
      },
      {
        pagePath: "/pages/category/category",
        text: "分类",
        iconPath: "/icons/category.png",
        selectedIconPath: "/icons/category_selected.png"
      },
      {
        pagePath: "/pages/cart/cart",
        text: "购物车",
        iconPath: "/icons/cart.png",
        selectedIconPath: "/icons/cart_selected.png"
      },
      {
        pagePath: "/pages/my/my",
        text: "我的",
        iconPath: "/icons/my.png",
        selectedIconPath: "/icons/my_selected.png"
      }
    ]
  },
  attached() {
    // 获取当前选中的标签页索引
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const route = currentPage.route;
    
    const tabList = this.data.list;
    const index = tabList.findIndex(item => item.pagePath === '/' + route);
    
    if (index !== -1) {
      this.setData({
        selected: index
      });
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({
        url
      });
      this.setData({
        selected: data.index
      });
    }
  }
}) 