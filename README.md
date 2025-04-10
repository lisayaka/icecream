## 项目概述

酥山冰淇淋小程序是一个集商品浏览、搜索、购物车管理、订单支付于一体的电商类微信小程序。产品以中国传统文化为主题，每款冰淇淋都以历史名胜或文化元素命名，如"大明宫月桂雪顶"、"华清池畔荔枝雪绒"等，旨在带给用户不仅是美味的享受，更是一场文化的体验。

## 项目结构

```
icecream/
├── pages/                # 小程序页面
│   ├── index/            # 首页
│   ├── category/         # 分类页
│   ├── search/           # 搜索页
│   ├── detail/           # 商品详情页
│   ├── cart/             # 购物车页
│   ├── orderConfirm/     # 订单确认页
│   ├── orders/           # 订单列表页
│   ├── my/               # 个人中心页
│   └── phoneLogin/       # 手机登录页
├── utils/                # 工具类函数
├── images/               # 图片资源
├── icons/                # 图标资源
├── app.js                # 应用程序逻辑
├── app.json              # 全局配置
└── app.wxss              # 全局样式
```

## 技术架构与实现

### 1. 微信小程序原生开发
- 采用**WXML+WXSS+JavaScript**的原生小程序开发方式
- 利用小程序的**声明式编程**模型，实现高效的界面开发
- 使用小程序的**组件化**思想构建界面，提高代码复用性
- 运用**MVVM架构**模式，实现数据和视图的分离

**示例：商品展示Grid布局**
```html
<!-- 商品网格布局示例 -->
<view class="grid">
  <view wx:for="{{goodsList}}" wx:key="id" class="goods-item">
    <view class="image-box">
      <image src="{{item.image}}" class="goods-image" bindtap="goToDetail" data-id="{{item.id}}" />
      <view class="tags">
        <text wx:for="{{item.tags}}" wx:key="*this" class="tag tag-{{index%3}}">{{item}}</text>
      </view>
    </view>
    <view class="info">
      <text class="title">{{item.name}}</text>
      <view class="price-line">
        <text class="price">¥{{item.price}}</text>
        <button class="cart-btn" bindtap="addToCart" data-item="{{item}}">
          <image src="/icons/add.png" class="cart-icon" />
        </button>
      </view>
    </view>
  </view>
</view>
```

### 2. 数据管理与存储
- 使用微信小程序的**App实例**进行全局数据共享
- 基于**Storage API**实现本地数据持久化存储
  - 购物车数据存储与恢复
  - 订单历史记录保存
  - 用户信息本地缓存
- 采用**globalData**模式管理应用全局状态

**示例：全局数据管理和本地存储**
```javascript
// app.js
App({
  globalData: {
    allGoods: [ /* 商品数据 */ ],
    cartList: [],
    orderList: []
  },

  onLaunch: function() {
    // 从本地存储加载购物车数据
    try {
      const cartList = wx.getStorageSync('cartList');
      if (cartList) {
        this.globalData.cartList = cartList;
      }
    } catch (e) {
      console.error('加载购物车数据失败:', e);
    }

    // 从本地存储加载订单数据
    try {
      const orderList = wx.getStorageSync('orderList');
      if (orderList) {
        this.globalData.orderList = orderList;
      }
    } catch (e) {
      console.error('加载订单数据失败:', e);
    }
  }
})
```

### 3. 购物车与订单流程

**示例：添加商品到购物车**
```javascript
addToCart(e) {
  const { goodsDetail } = this.data;
  const app = getApp();
  const cartList = app.globalData.cartList;
  const index = cartList.findIndex(item => item.id === goodsDetail.id);
  if (index === -1) {
    // 商品不在购物车中，添加到购物车
    goodsDetail.quantity = 1;
    goodsDetail.checked = false; // 默认不选中
    cartList.push(goodsDetail);
  } else {
    // 商品已在购物车中，增加数量
    cartList[index].quantity++;
  }
  app.globalData.cartList = cartList;
  wx.showToast({
    title: '已加入购物车',
    icon: 'success',
    duration: 1500
  });
}
```

**示例：订单生成与支付流程**
```javascript
// 订单提交处理
onSubmitPayment() {
  if (!this.data.paymentMethod) {
    wx.showToast({
      title: '请选择支付方式',
      icon: 'none',
      duration: 1500
    });
    return;
  }

  wx.showLoading({ title: '支付处理中...' });

  // 生成订单ID
  const orderId = this.generateOrderId();

  setTimeout(() => {
    wx.hideLoading();

    // 保存订单数据到全局
    this.saveOrder(
      orderId,
      this.data.selectedItems,
      this.data.totalPrice,
      this.data.paymentMethod
    );

    // 清空购物车
    app.globalData.cartList = [];
    wx.setStorageSync('cartList', []);

    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 1500,
      success: () => {
        // 支付成功后的跳转逻辑
      }
    });
  }, 1500);
}
```

### 4. 用户登录与信息管理

**示例：手机号登录流程**
```javascript
// 手机号登录处理
handleLogin() {
  if (!this.data.canLogin) return;

  wx.showLoading({ title: '登录中...' });

  // 模拟登录成功
  setTimeout(() => {
    wx.hideLoading();
    
    // 保存登录状态
    const userInfo = {
      phone: this.data.phone,
      nickName: '用户' + this.data.phone.substr(-4),
      avatarUrl: '/images/avatar.jpg'
    };
    
    wx.setStorageSync('userInfo', userInfo);
    
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      success: () => {
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
  }, 1500);
}
```

### 5. 响应式界面设计

**示例：Flex布局与rpx单位**
```css
/* 底部购物车结算栏 */
.bottom-bar {
  position: fixed;
  bottom: 110rpx;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 20rpx;
  box-sizing: border-box;
  z-index: 999;
  height: 100rpx;
  box-shadow: 0 -2rpx 6rpx rgba(0, 0, 0, 0.05);
}

.left-section {
  display: flex;
  align-items: center;
  gap: 15rpx;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 20rpx;
}
```

## 功能特色

- **精美首页展示**：轮播图展示特色产品，功能区快速导航
- **分类浏览**：按照冰淇淋类型进行分类浏览
- **商品搜索**：支持按名称搜索商品
- **商品详情**：展示商品详细信息、月售量和好评率
- **购物车管理**：添加、删除、修改数量等操作
- **订单支付流程**：商品选择、确认订单、支付方式选择
- **订单记录**：查看历史订单
- **用户中心**：个人信息管理、收货地址管理
- **登录功能**：支持微信一键登录和手机号登录两种方式

## 安装使用

1. 克隆仓库到本地
2. 使用微信开发者工具打开项目
3. 编译运行即可体验