// age.json
export interface ageInt {
  'age': number
  'event'?: (string | number)[]
}

// events.json
export interface effectInt {
  'CHR'?: number      // 颜值 charm CHR
  'INT'?: number      // 智力 intelligence INT
  'STR'?: number      // 体质 strength STR
  'MNY'?: number      // 家境 money MNY
  'SPR'?: number      // 快乐 spirit SPR
  'LIF'?: number      // 生命 life LIF
  'AGE'?: number      // "AGE": -5 "时光突然倒流了。"
}
export interface eventInt {
  'age'?: number
  'branch'?: string[]
  'effect'?: effectInt
  'event'?: string
  'exclude'?: string
  'id'?: number
  'include'?: string
  'NoRandom'?: number
  'postEvent'?: string
}

export interface talentsObj {
  'condition'?: string
  'description'?: string
  'effect'?: effectInt
  'exclusive'?: string[]
  'grade'?: number
  'id'?: string
  'name'?: string
  'status'?: number
}
