export interface GateOption {
  id: string
  name: string
  isSelected?: boolean
}

export interface GateData {
  title: string
  subtitle: string
  options: GateOption[]
}
