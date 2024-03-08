<template>
  <div class="login_container">
    <!-- 登陆模块 -->
    <div class="login_box">
      <!-- 头像 -->
      <div class="avater_box">
        <img src="../assets/logo.png" />
      </div>
      <div class="div_denglu">
        <!-- 登陆输入框以及按钮 -->
        <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm" class="form_box" label-width="0px">
          <!-- 用户名 -->
          <el-form-item label="" prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <div class="div_anniu">
            <el-button type="primary" @click="submitForm">登陆</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登陆表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 点击重置按钮重置表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields();
    },
    // 登陆按钮
    submitForm () {
      // 使用 validate 方法进行表单验证
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          // 验证通过，进行服务器访问看账号密码是否正确
          const { data: res } = await this.$http.post('login', this.loginForm);
          // 账号密码错误情况
          if (res.meta.status != 200) {
            return this.$message.error('用户名或密码错误');
          }
          // 账号密码正确情况
          else {
            this.$message({
              message: '登陆成功',
              type: 'success'
            });
            // 1. 将登陆成功后的token，保存到客户端的sessionStirage中
            //    	项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
            //    	token中应在当前网站打开期间生效，所以token保存在sessionStirage
            console.log(res.data.token);
            sessionStorage.setItem('token', res.data.token);
            // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
            this.$router.push('/home');
          }
        }
        // 验证不通过，显示错误信息或其他处理
        else {
          console.log('表单验证失败');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 2%;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
}

.avater_box {
  height: 130px;
  width: 130px;
  border: 2px solid #eee;
  border-radius: 50%;
  padding: 10px;
  background-color: #fff;
  margin-top: -20%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.div_denglu {
  width: 90%;
  margin: 10px;
}

.div_anniu {
  display: flex;
  justify-content: flex-end;
}
</style>
