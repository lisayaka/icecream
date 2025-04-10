const app = getApp();

Page({
  data: {
    searchKeyword: '',
    searchResults: []
  },

  onLoad(options) {
    console.log('搜索页面收到的参数:', options);
    // 如果从其他页面带有搜索关键词跳转过来
    if (options && options.keyword) {
      const keyword = options.keyword;
      console.log('设置搜索关键词:', keyword);
      
      // 设置关键词并立即搜索
      this.setData({
        searchKeyword: keyword
      }, () => {
        // 在setData的回调中执行搜索，确保数据更新后再搜索
        this.search(keyword);
      });
    }
  },

  // 输入框输入时触发
  onSearchInput(e) {
    const value = e.detail.value;
    console.log('输入框输入:', value);
    this.setData({
      searchKeyword: value
    });
  },

  // 点击搜索或回车时触发
  onSearch() {
    const keyword = this.data.searchKeyword;
    if (!keyword || !keyword.trim()) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }
    this.search(keyword);
  },

  // 搜索方法
  search(keyword) {
    if (!keyword || !keyword.trim()) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }
    
    // 使用全局商品数据进行搜索
    const allGoods = app.globalData.allGoods || [];
    console.log('搜索关键词:', keyword);
    console.log('所有商品:', allGoods);
    
    const results = allGoods.filter(good => {
      const name = good.name ? good.name.toLowerCase() : '';
      const tags = good.tags || [];
      const searchKey = keyword.toLowerCase();
      
      return name.includes(searchKey) || 
             tags.some(tag => tag.toLowerCase().includes(searchKey));
    });

    console.log('搜索结果:', results);

    this.setData({
      searchResults: results
    });

    // 如果没有搜索结果，显示提示
    if (!results || results.length === 0) {
      wx.showToast({
        title: '未找到相关商品',
        icon: 'none'
      });
    }
  },

  // 添加到购物车
  addToCart(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.searchResults.find(good => good.id === id);
    
    if (!item) return;

    let cartList = app.globalData.cartList || [];
    // 检查商品是否已在购物车中
    const existingItemIndex = cartList.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      // 如果商品已在购物车中，增加其数量
      cartList[existingItemIndex].quantity++;
    } else {
      // 如果商品不在购物车中，添加到购物车并设置初始数量为 1
      item.quantity = 1;
      item.checked = false; // 默认不选中
      cartList.push(item);
    }
    
    // 更新全局数据中的购物车信息
    app.globalData.cartList = cartList;
    
    // 显示提示信息
    wx.showToast({
      title: '已添加到购物车',
      icon: 'success'
    });
  },

  // 跳转到商品详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  }
}); 