export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

export const getShortName = (fullName: string | undefined) => {
  if (!fullName) return "??"

  const nameParts = fullName.split(" ")

  const firstInitial = nameParts[0].charAt(0).toUpperCase()
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase()

  return (firstInitial + lastInitial).toUpperCase()
}

export const parseTime = (timeStr?: string): Date | null => {
  if (!timeStr) return null

  const [hour, minute] = timeStr.split(':').map(Number)
  const date = new Date()
  date.setHours(hour)
  date.setMinutes(minute)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return new Date(date)
}


export const formatTime = (input: string | Date | number): string => {
  const date = new Date(input)

  const pad = (n: number): string => n.toString().padStart(2, '0')

  const dd = pad(date.getDate())
  const mm = pad(date.getMonth() + 1)
  const yyyy = date.getFullYear()

  const hh = pad(date.getHours())
  const min = pad(date.getMinutes())
  const ss = pad(date.getSeconds())

  return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`
}

export function formatPathToTitle(path: string): string {
  if (!path) return ''
  const lastPart = path.split('/').filter(Boolean).pop() || ''
  return lastPart
    .split('-')
    .map(word => word.charAt(0) + word.slice(1))
    .join(' ')
}