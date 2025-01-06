export interface IAccount {
  id: `${string}-${string}-${string}-${string}-${string}`
  marks: string | Array<string>
  recordType: string
  login: string
  password: string
  showPassword: boolean
  valid: boolean
}
