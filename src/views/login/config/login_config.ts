// 登录表单验证规则
export const rules = {
  name: [
    {
      required: true, // 必传项
      message: 'The account is necessary!', // 错误提示
      trigger: 'blur' // 失去焦点触发验证
    },
    {
      pattern: /^[A-Za-z0-9_]+$/,
      message: 'The account can only contain letters and numbers!',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'The password is necessary!',
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      message:
        'The password must be more than 8 characters and contain at least one upper letter, one lower letter and a number!',
      trigger: 'blur'
    }
  ]
}
