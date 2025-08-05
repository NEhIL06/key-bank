export interface ApiKey {
  id: string
  name: string
  service: string
  environment: string
  keyValue: string
  maskedValue: string
  createdAt: string
  notes: string
  rotationReminder: string
}

export interface Project {
  id: string
  name: string
  keyCount: number
  keys: ApiKey[]
}
