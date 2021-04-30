import Api from '../api'

interface IcreateTodo {
  name: string;
  email: string;
  description: string;
  status: string;
}

interface IDeleteTodo {
  id: string | number;
}

interface IUpdateTodo {
  id: string;
  status: string;
  back?: number;
}

export async function getAll(): Promise<any[]> {
  const { data } = await Api.get('/todo')

  return data;
}

export async function create(object: IcreateTodo): Promise<object> {
  const { data } = await Api.post('/todo', object)

  return data
}

export async function createNothing(): Promise<void> {
  await Api.post('/todo/nothing')
}

export async function deleteItem({ id }: IDeleteTodo): Promise<void> {
  return new Promise<void>(async (resolve): Promise<void> => {
    await Api.delete(`/todo/${id}`)
    resolve()
  })
}

export async function updateItem({ id, status, back }: IUpdateTodo): Promise<object> {
  const { data } = await Api.put(`/todo/${id}`, { status, back })

  return data
}