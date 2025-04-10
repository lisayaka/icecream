const app = getApp();

// 封装随机选取商品的函数
function getRandomGoods(allGoods, count) {
  const goodsCount = allGoods.length;
  if (goodsCount < count) {
    return allGoods;
  }
  const selectedGoods = [];
  const selectedIndices = [];
  while (selectedGoods.length < count) {
    const randomIndex = Math.floor(Math.random() * goodsCount);
    if (!selectedIndices.includes(randomIndex)) {
      selectedIndices.push(randomIndex);
      selectedGoods.push(allGoods[randomIndex]);
    }
  }
  return selectedGoods;
}

Page({
  data: {
    searchValue: "",
    bannerList: [
      { imageUrl: "/images/banner.png" },
      { imageUrl: "/images/banner2.png" },
      { imageUrl: "/images/banner3.png" }
    ],
     // 功能区配置
     funcList: [
      { icon: '/icons/fuc1.png', title: '开始点单' },
      { icon: '/icons/fuc2.png', title: '新品推荐' },
      { icon: '/icons/fuc3.png', title: '特色产品' },
      { icon: '/icons/fuc4.png', title: '我的订单' }
    ],
    searchResults: [],
    showResults: false,
    goodsList: [],
    cartList: [] // 新增购物车数据存储结构
  },
  onLoad() {
    const allGoods = app.globalData.allGoods;
    // 指定要显示的商品ID
    const recommendedIds = [5, 4, 1, 6];
    const recommendedGoods = allGoods.filter(good => recommendedIds.includes(good.id));
    // 按照指定顺序排序
    const sortedGoods = recommendedIds.map(id => recommendedGoods.find(good => good.id === id));
    
    this.setData({
      goodsList: sortedGoods
    });
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0 // 首页的索引是0
      });
    }
  },
  handleInput: function (e) {
    const searchValue = e.detail.value;
    this.setData({
      searchValue: searchValue
    });
  },
  handleSearch: function (e) {
    const searchValue = this.data.searchValue;
    if (!searchValue || !searchValue.trim()) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }
    console.log('跳转搜索，关键词:', searchValue);
    // 跳转到搜索页面
    wx.navigateTo({
      url: `/pages/search/search?keyword=${searchValue}`
    });
  },
  // 点击搜索框时直接跳转到搜索页面
  handleSearchTap: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },
  handleClose: function (e) {
    const index = e.currentTarget.dataset.index;
    let searchResults = this.data.searchResults;
    searchResults.splice(index, 1);
    this.setData({
      searchResults: searchResults
    });
    if (searchResults.length === 0) {
      this.setData({
        showResults: false
      });
    }
  },
  addToCart: function (e) {
    const item = e.currentTarget.dataset.item;
    let cartList = this.data.cartList;
    // 检查商品是否已在购物车中
    const existingItemIndex = cartList.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      // 如果商品已在购物车中，增加其数量
      cartList[existingItemIndex].quantity++;
    } else {
      // 如果商品不在购物车中，添加到购物车并设置初始数量为 1，默认不选中
      item.quantity = 1;
      item.checked = false; // 默认不选中
      cartList.push(item);
    }
    this.setData({
      cartList: cartList
    });
    // 更新全局数据中的购物车信息
    app.globalData.cartList = cartList;
    // 显示提示信息
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500
    });
  },
  goToDetail: function (e) {
    const goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: `/pages/detail/detail?id=${goodsId}`
    });
},
goToOrderPage: function () {
  wx.navigateTo({
    url: '/pages/orders/orders'
  });
},
goToCategoryPage: function () {
  wx.switchTab({
    url: '/pages/category/category',
  })
},
goToSpecialProduct: function () {
  wx.navigateTo({
    url: '/pages/detail/detail?id=4'
  });
},
goToNewProductPage: function () {
  // 先存储要跳转的分类ID
  app.globalData.categoryId = 5;
  console.log('设置分类ID:', app.globalData.categoryId);
  
  // 然后跳转到分类页面
  wx.switchTab({
    url: '/pages/category/category',
    success: function() {
      console.log('跳转到分类页面成功');
    }
  });
}
});