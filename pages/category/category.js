// pages/category/category.js
Page({
  data: {
    activeCate: 1,
    categories: [
      { id: 1, name: "盛唐" },
      { id: 2, name: "名胜" },
      { id: 3, name: "古韵" },
      { id: 4, name: "梦幻" },
      { id: 5, name: "新品推荐" }

    ],
    products:{},  //用于存储分类后的商品数据
    currentProducts:[] //当前选中分类的商品列表
  },

  // 页面显示时触发
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 // 分类页的索引是1
      });
    }
    
    // 保留原有的onShow逻辑
    const app = getApp();
    // 检查全局变量中是否有指定分类ID
    if (app.globalData && app.globalData.categoryId) {
      const categoryId = app.globalData.categoryId;
      console.log('检测到分类ID:', categoryId);
      
      // 找到对应的分类
      const category = this.data.categories.find(cate => cate.id === categoryId);
      if (category) {
        console.log('切换到分类:', category.name);
        // 切换到指定分类
        this.setData({
          activeCate: categoryId,
          currentProducts: this.data.products[category.name] || []
        });
        // 清除全局变量，防止下次onShow时重复切换
        app.globalData.categoryId = null;
      }
    }
  },

  // 切换分类
  switchCategory(e) {
    const cateId = e.currentTarget.dataset.id;
    const category = this.data.categories.find(cate => cate.id === cateId);
    this.setData({
      activeCate: cateId,
      currentProducts: this.data.products[category.name] || []
    });
  },

 // 加入购物车
 addToCart(e) {
  const app = getApp();
  const productId = e.currentTarget.dataset.id;
  const product = this.data.currentProducts.find(item => item.id == productId);
  // 检查商品是否已经在购物车中
  const index = app.globalData.cartList.findIndex(item => item.id === product.id);
  if (index === -1) {
    // 商品不在购物车中，添加到购物车，默认不选中
    product.quantity = 1;
    product.checked = false; // 默认不选中
    app.globalData.cartList.push(product);
  } else {
    // 商品已经在购物车中，增加数量
    app.globalData.cartList[index].quantity++;
  }
  wx.showToast({
    title: '已添加到购物车',
    icon: 'success',
    duration: 1500
  });
},

onLoad() {
  const app = getApp();
  const allGoods = app.globalData.allGoods;
  const products = {};
  const newProductIds = [1, 2, 4, 5, 10]; // 新品推荐的商品ID

  // 对商品进行分类
  allGoods.forEach(good => {
    // 保存到原始分类
    if (!products[good.type]) {
      products[good.type] = [];
    }
    products[good.type].push(good);

    // 如果是新品推荐的商品，也添加到新品推荐分类中
    if (newProductIds.includes(good.id)) {
      if (!products['新品推荐']) {
        products['新品推荐'] = [];
      }
      products['新品推荐'].push(good);
    }
  });

  const defaultCate = this.data.categories[0];
  this.setData({
    products,
    activeCate: defaultCate.id,
    currentProducts: products[defaultCate.name] || []
  });
},
 // 跳转到商品详情页
 goToDetail(e) {
  const productId = e.currentTarget.dataset.id;
  wx.navigateTo({
    url: `/pages/detail/detail?id=${productId}`
  });
},


})