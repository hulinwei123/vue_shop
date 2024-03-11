<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="widthCollapse + 'px'">
        <!-- 菜单栏的折叠和展开 -->
        <div class="toggle-button" @click="toggleCollapse">
          <div class="toggle-button-1">|||</div>
        </div>
        <!-- 侧边栏菜单区域 -->
        <el-menu :collapse-transition="false" :collapse="isCollapse" background-color="#333744" text-color="#fff"
          active-text-color="#409EFF" width="201px" :unique-opened="true">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsList[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="item.id + '-' + item1.id" v-for="item1 in item.children" :key="item1.id">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ item1.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsList: {
        '125': 'iconfont icon-users',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 默认为不折叠
      isCollapse: false,
      widthCollapse: 200

    }
  },
  // 生命周期函数
  created () {
    this.getMenuList()
  },
  methods: {
    // 退出按钮
    logOut () {
      sessionStorage.clear();
      this.$router.push('/login');
    },
    // 获取所有的菜单
    async getMenuList () {
      try {
        const response = await this.$http.get('menus');
        const res = response.data;

        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }

        this.menulist = res.data;
        console.log(this.menulist);
      } catch (error) {
        console.error('Error fetching menu data:', error);
        this.$message.error('Failed to fetch menu data');
      }
    },
    // 点击按钮切换菜单的折叠
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) this.widthCollapse = 64
      else this.widthCollapse = 200
    }

  }

}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  align-items: center;
  color: #fff;
  font-size: 20px;

  >div {
    display: flex;
    align-items: center;

    >span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #E9EDF0;
}

.iconfont {
  margin-right: 20px;
  /* 右边距为20像素 */
}

.el-menu {
  border-right: solid 0px #e6e6e6;
}

.toggle-button {
  background-color: #4A5064;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.toggle-button-1 {
  color: #fff;
  margin: 5px;
  // 彼此加空隙
  letter-spacing: 0.2em;
  // 变小手
}
</style>