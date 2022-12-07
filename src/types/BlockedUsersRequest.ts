export type UpdatedUsersRequest = {
  users: UpdatedUser[];
}

type UpdatedUser = {
  id: string;
  status?: string;
  role?: string
}