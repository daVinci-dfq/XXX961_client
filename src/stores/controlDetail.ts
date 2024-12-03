import { ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { postDetail } from '@/utils/api'

export const controlDetail = () => {
  type Detail = {
    commentCount: number
  }

  const detail = ref<Detail>({ commentCount: 0 })

  const comments = ref([])
  // 评论内容
  const content = ref('')
  const userStore = useUserStore()

  const afterDoComment = () => {
    detail.value.commentCount += 1
  }

  const getDetail = async (id: number) => {
    const res = await postDetail({ id })
    detail.value = res.info
    document.title = detail.value.title
  }

  const SetComment = (comment: any) => {
    comments.value = [...comments.value, ...comment]
  }

  return {
    detail,
    comments,
    content,
    afterDoComment,
    getDetail,
    SetComment
  }
}
