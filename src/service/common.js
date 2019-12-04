const remindOptions = [
  {
    value: '24',
    label: '一天一次'
  },
  {
    value: '48',
    label: '两天一次'
  },
  {
    value: '72',
    label: '三天一次'
  },
  {
    value: '168',
    label: '一周一次'
  },
  {
    value: '720',
    label: '一月一次'
  }
]
const remindTypes = [
  {
    value: 'information',
    label: '消息'
  },
  {
    value: 'mail',
    label: '邮箱'
  },
  {
    value: 'message',
    label: '短信'
  }
]
const limitTypes = [
  {
    value: 'information',
    label: '消息'
  },
  {
    value: 'mail',
    label: '邮箱'
  },
  {
    value: 'message',
    label: '短信'
  }
]
const tagTypeOptions = [
  {
    value: '固定资产普通标签',
    label: '固定资产普通标签'
  },
  {
    value: '固定资产RFID标签（抗金属）',
    label: '固定资产RFID标签（抗金属）'
  },
  {
    value: '固定资产RFID标签（非抗金属）',
    label: '固定资产RFID标签（非抗金属）'
  },
  {
    value: '父资产普通标签',
    label: '父资产普通标签'
  }
]
const checkPlanTypeOptions = [
  {
    value: 'rfid',
    label: 'RFID读取'
  },
  {
    value: 'app',
    label: '手机APP扫码拍照'
  },
  {
    value: 'person',
    label: '人工核对'
  }
]
const checkPlanType = {
  rfid: 'RFID读取',
  app: '手机APP扫码拍照',
  person: '人工核对'
}
export {remindOptions, remindTypes, limitTypes, tagTypeOptions, checkPlanTypeOptions, checkPlanType}
