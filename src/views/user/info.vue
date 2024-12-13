<template>
  <div class="user-page">
    <div class="user">
      <div class="user-info">
        <div class="avatar">
          <div class="avatar-wrapper">
            <el-upload
              ref="uploadRef"
              class="avatar-uploader"
              action="http://localhost:6539/user/uploadAvatar"
              :show-file-list="false"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <img v-else src="/public/avatar.jpg" width="278" class="avatar" />
            </el-upload>
            <el-button
              icon="el-icon-plus"
              size="small"
              class="uploadButton"
              @click="submitUpload"
              >上传头像</el-button
            >
          </div>
        </div>
        <div class="info-part">
          <div class="info">
            <div class="basic-info">
              <div class="user-basic">
                <div class="user-nickname">
                  <div class="user-name">
                    {{ userInfo.username }}
                  </div>
                </div>
                <div class="user-content">
                  <span class="user-redId">小红书号：{{ userInfo.yxId }}</span
                  ><span class="seperate">|</span
                  ><span class="user-IP"> IP属地：山东</span>
                </div>
              </div>
            </div>
            <div class="user-desc">
              <span v-if="userInfo.description === null"
                >这个人什么都没有写～</span
              >
              <span v-else>{{ userInfo.description }}</span>
            </div>
            <div class="user-tags">
              <div class="tag-item">
                <div>射手座</div>
              </div>
              <div class="tag-item">
                <div>山东济南</div>
              </div>
              <div class="tag-item">
                <div>程序员</div>
              </div>
            </div>
            <div class="data-info">
              <div class="user-interactions">
                <div>
                  <span class="count">{{ userInfo.trendCount }}</span
                  ><span class="shows">作品</span>
                </div>
                <div>
                  <span class="count">{{ userInfo.followerCount }}</span
                  ><span class="shows">关注</span>
                </div>
                <div>
                  <span class="count">{{ userInfo.fanCount }}</span
                  ><span class="shows">粉丝</span>
                </div>
              </div>
            </div>
            <!---->
          </div>
          <div class="follow"><!----></div>
        </div>

        <!-- <div class="tool-btn" v-show="uid !== currentUid">
          <el-button :icon="ChatLineRound" circle @click="toChat" />

          <el-button type="info" round v-if="_isFollow" @click="follow(uid, 1)"
            >已关注</el-button
          >
          <el-button type="danger" round v-else @click="follow(uid, 0)"
            >关注</el-button
          > -->
        <!-- </div>  -->
      </div>
    </div>
    <div
      class="reds-sticky-box user-page-sticky"
      style="--1ee3a37c: all 0.4s cubic-bezier(0.2, 0, 0.25, 1) 0s"
    >
      <div class="reds-sticky" style="">
        <div class="tertiary center reds-tabs-list" style="padding: 0px 12px">
          <div
            :class="type == 1 ? 'reds-tab-item active' : 'reds-tab-item'"
            style="padding: 0px 16px; margin-right: 0px; font-size: 16px"
          >
            <!----><!----><span @click="toPage(1)">笔记</span>
          </div>
          <div
            :class="type == 2 ? 'reds-tab-item active' : 'reds-tab-item'"
            style="padding: 0px 16px; margin-right: 0px; font-size: 16px"
          >
            <!----><!----><span @click="toPage(2)">点赞</span>
          </div>
          <div
            :class="type == 3 ? 'reds-tab-item active' : 'reds-tab-item'"
            style="padding: 0px 16px; margin-right: 0px; font-size: 16px"
          >
            <!----><!----><span @click="toPage(3)">收藏</span>
          </div>
          <!---->
          <div class="active-tag" style="width: 64px; left: 627px"></div>
        </div>
      </div>
    </div>
    <div
      class="feeds-tab-container"
      style="--1ee3a37c: all 0.4s cubic-bezier(0.2, 0, 0.25, 1) 0s"
    >
      <!-- <router-view /> -->
      <Chat
        v-if="chatShow"
        :acceptUid="uid"
        class="animate__animated animate__zoomIn animate__delay-0.5s"
        @click-chat="close"
      ></Chat>

      <!-- <Note :type="type"></Note> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ChatLineRound } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
// import { getUserById } from '@/api/user'
// import Note from '@/components/Note.vue'
import { useUserStore } from '@/stores/modules/userStore'
// import Chat from '@/components/Chat.vue'
// import { followById, isFollow } from '@/api/follower'
import { useRoute } from 'vue-router'
const uploadRef = ref(null)
const imgUrl = ref('')
const route = useRoute()
const userStore = useUserStore()
// const currentUid = userStore.getUserInfo().id
const userInfo = ref<any>({})
//const uid = history.state.uid;
const uid = route.query.uid as string
const type = ref(1)
const chatShow = ref(false)
const _isFollow = ref(false)

onMounted(() => {
  fetchUserAvatar()
})
const fetchUserAvatar = () => {
  // 假设有一个后端接口返回用户头像URL
  axios
    .get('/api/user/avatar')  //后端接口
    .then((response) => {
      imgUrl.value = response.data.avatarUrl
    })
    .catch((error) => {
      console.error('获取用户头像失败', error)
    })
}
const toPage = (val: number) => {
  type.value = val
}

const close = () => {
  chatShow.value = false
}

const toChat = () => {
  chatShow.value = true
}
const handleSuccess = (file) => {
  imgUrl.value = URL.createObjectURL(file.raw)
}
const beforeUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG) {
    ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
    return false
  }
  return true
}
// const submitUpload = () => {
//   uploadRef.value.submit()
// }

// //上传头像
// const submitUpload = async () => {
//   const formData = new FormData()
//   formData.append('file', uploadRef.value.uploadFiles[0].raw)

//   try {
//     const response = await axios.post(`/api/users/${userId}/avatar`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//     ElMessage.success('头像上传成功！')
//     imgUrl.value = `/uploads/${response.data.avatar}`
//   } catch (error) {
//     ElMessage.error('头像上传失败！')
//   }
// }

// const follow = (fid: string, type: number) => {
//   followById(fid).then(() => {
//     _isFollow.value = type == 0
//   })
// }

// const initData = () => {
//   getUserById(uid).then((res) => {
//     userInfo.value = res.data
//   })
//   isFollow(uid).then((res) => {
//     _isFollow.value = res.data
//   })
// }

// initData()
</script>

<style lang="less" scoped>
.user-page {
  background: #fff;
  height: 100vh;

  .user {
    padding-top: 72px;
    display: flex;
    align-items: center;
    justify-content: center;

    .user-info {
      display: flex;
      justify-content: center;
      padding: 48px 0;

      .avatar {
        .avatar-wrapper {
          text-align: center;
          width: 250.66667px;
          height: 175.46667px;
          margin-top: -70px;

          .user-image {
            border-radius: 50%;
            margin: 0 auto;
            width: 70%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      .uploadButton {
        width: 70px;
        height: 30px;
        margin-top: 5px;
      }

      .info-part {
        position: relative;
        width: 100%;

        .info {
          @media screen and (min-width: 1728px) {
            width: 533.33333px;
          }

          margin-left: 32px;

          .basic-info {
            display: flex;
            align-items: center;

            .user-basic {
              width: 100%;

              .user-nickname {
                width: 100%;
                display: flex;
                align-items: center;
                max-width: calc(100% - 96px);

                .user-name {
                  font-weight: 600;
                  font-size: 24px;
                  line-height: 120%;
                  color: #333;
                }
              }

              .user-content {
                width: 100%;
                font-size: 12px;
                line-height: 120%;
                color: rgba(51, 51, 51, 0.6);
                display: flex;
                margin-top: 8px;

                .user-redId {
                  padding-right: 12px;
                }
              }
            }
          }

          .seperate {
            margin-right: 5px;
            margin-left: 5px;
            color: #d9d9d5;
          }

          .user-desc {
            width: 100%;
            font-size: 14px;
            line-height: 140%;
            color: #333;
            margin-top: 16px;
            white-space: pre-line;
          }

          .user-tags {
            height: 24px;
            margin-top: 16px;
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #333;
            text-align: center;
            font-weight: 400;
            line-height: 120%;

            .tag-item :first-child {
              padding: 3px 6px;
            }

            .tag-item {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 4px 8px;
              grid-gap: 4px;
              gap: 4px;
              height: 18px;
              border-radius: 41px;
              background: rgba(0, 0, 0, 0.03);
              height: 24px;
              line-height: 24px;
              margin-right: 6px;
              color: rgba(51, 51, 51, 0.6);
            }
          }

          .data-info {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;

            .user-interactions {
              width: 100%;
              display: flex;
              align-items: center;

              .count {
                font-weight: 500;
                font-size: 14px;
                margin-right: 4px;
              }

              .shows {
                color: rgba(51, 51, 51, 0.6);
                font-size: 14px;
                line-height: 120%;
              }
            }

            .user-interactions > div {
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              margin-right: 16px;
            }
          }
        }

        .follow {
          position: absolute;
          margin-left: auto;
          display: block;
          right: 0;
          top: 0;
        }
      }

      .tool-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .reds-sticky {
    padding: 16px 0;
    z-index: 5 !important;
    background: hsla(0, 0%, 100%, 0.98);

    .reds-tabs-list {
      @media screen and (min-width: 1728px) {
        width: 1445.33333px;
      }

      display: flex;
      flex-wrap: nowrap;
      position: relative;
      font-size: 16px;
      justify-content: center;

      .reds-tab-item {
        padding: 0px 16px;
        margin-right: 0px;
        font-size: 16px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 40px;
        cursor: pointer;
        color: rgba(51, 51, 51, 0.8);
        white-space: nowrap;
        transition: transform 0.3s cubic-bezier(0.2, 0, 0.25, 1);
        z-index: 1;
      }

      .reds-tab-item.active {
        background-color: rgba(0, 0, 0, 0.03);
        border-radius: 20px;
        font-weight: 600;
        color: rgba(51, 51, 51, 0.8);
      }
    }
  }

  .feeds-tab-container {
    padding-left: 2rem;
  }
}
</style>
