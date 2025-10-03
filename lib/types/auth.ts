export type DepartmentProps = {
  id: number
  name: string
  leaders: UserDataProps[]
}

export type RoleProps = {
  id: number
  name: string
}

export type LocationProps = {
  id: number
  name: string
  users: UserDataProps[]
}

export type UserDataProps = {
  id: number
  username: string
  first_name: string
  last_name: string
  role: RoleProps
  avatar: string
  full_name: string
  status: boolean
  department: DepartmentProps
  locations: LocationProps[]
  access_token: string
  refresh_token: string
}

export type SignUpProps = {
  username: string
  last_name: string
  first_name: string
  password: string
  department_id: number
  role_id: number
  is_leader: boolean
  floor_ids: string[]
}

