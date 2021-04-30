import React, { useCallback, useEffect, useState } from 'react'
import ModalNewTodo from '../ModalNewTodo'
import ModalDeleteTodo from '../ModalDeleteTodo'
import ModalPasswordTodo from '../ModalPasswordTodo'
import { deleteItem, updateItem } from '../../services/todo'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './styles.css'
import { toast } from 'react-toastify'

interface IReceive {
  title: string;
  Icon: any;
  List: any[];
  todoCreated?: any;
  todoCompleted?: any;
  todoDoing?: any;
  setTodoCompleted?: any;
  setTodoDoing?: any;
  setTodoCreated?: any;
  setIsNothing?: any;
}

const Todo: React.FC<IReceive> = ({ title, Icon, List, setTodoCompleted, todoCompleted, setTodoCreated, todoCreated, setTodoDoing, todoDoing, setIsNothing }: IReceive) => {
  const [isCreate, setIsCreate] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [listArray, setListArray] = useState(List)
  const [id, setId] = useState<number>()
  const [index, setIndex] = useState<number>()

  useEffect(() => {
    setListArray(List)
  }, [List, todoCreated, todoDoing, todoCompleted])

  const handleChangeOnDrag = useCallback((drag) => {
    if (!drag.destination) return;
    const items = Array.from(listArray)
    const [reorderedItem] = items.splice(drag.source.index, 1)
    items.splice(drag.destination.index, 0, reorderedItem)

    setListArray(items)
  }, [listArray])

  const handleDeleteItem = useCallback(async (id: number | string) => {
    try {
      if (id) {
        await deleteItem({ id })
        const list = listArray.filter(item => item.id !== id)
        setListArray(list)
        if (!list?.length && !todoDoing?.length) setIsNothing(true)
      }
    } catch (error) {
      console.log(error.message)
    }

  }, [listArray, setIsNothing, todoDoing])

  const handleOpenModalDelete = useCallback(async (id: any) => {
    setId(id)
    setIsDelete(!isDelete)
  }, [isDelete])

  const handleOpenModalPassword = useCallback(async (id: any, index: any) => {
    const finditem = listArray.find(x => x.id === id)

    if (finditem.back >= 2) {
      return toast.error("Você não poderá voltar esse card pois já atingiu a quantidade maxima de mudanças")
    }

    setId(id)
    setIndex(index)
    setIsPassword(!isPassword)
  }, [listArray, isPassword])

  const handleBackCard = useCallback(async (id, index) => {
    const finditem = listArray.find(x => x.id === id)

    if (finditem.status === "doing") {
      updateItem({ id, status: 'created' })

      const item = listArray[index]
      const newListArray = listArray.splice(index, 1)
      setListArray(newListArray)
      setTodoCreated([...todoCreated, { ...item, status: 'created' }])
    }
    if (finditem.status === "completed" && finditem.back !== 2) {
      updateItem({ id, status: 'doing', back: finditem.back + 1 })

      const item = listArray[index]
      const newListArray = listArray.splice(index, 1)
      setListArray(newListArray)
      setTodoDoing([...todoDoing, { ...item, status: 'doing', back: finditem.back + 1 }])
      if (!todoCreated?.length && !todoDoing?.length) setIsNothing(false)
    }
  }, [listArray, setTodoCreated, todoCreated, setTodoDoing, setIsNothing, todoDoing])

  const handleNextCard = useCallback(async (id, index) => {

    const finditem = listArray.find(x => x.id === id)

    if (finditem.status === "created") {
      updateItem({ id, status: 'doing' })

      const item = listArray[index]
      const newListArray = listArray.splice(index, 1)
      setListArray(newListArray)
      setTodoDoing([...todoDoing, { ...item, status: 'doing' }])
    }

    if (finditem.status === "doing") {
      updateItem({ id, status: 'completed' })

      const item = listArray[index]
      const newListArray = listArray.splice(index, 1)
      setListArray(newListArray)
      setTodoCompleted([...todoCompleted, { ...item, status: 'completed' }])
      if (!todoCreated?.length && !todoDoing?.length) setIsNothing(true)
    }
  }, [listArray, setTodoDoing, todoDoing, todoCreated, setIsNothing, setTodoCompleted, todoCompleted])
  return (
    <>
      {isCreate && <ModalNewTodo isCreate={isCreate} setIsCreate={setIsCreate} />}
      {isDelete && <ModalDeleteTodo isDelete={isDelete} setIsDelete={setIsDelete} handleDeleteItem={handleDeleteItem} id={id} />}
      {isPassword && <ModalPasswordTodo isPassword={isPassword} setIsPassword={setIsPassword} handleBackCard={handleBackCard} id={id} index={index} />}
      <div className="toDo">
        <div className="title">
          <div id="iconContainer">
            <Icon className="icon" />
            <span>
              {title}
            </span>
          </div>
          {title === 'Criado' && <button onClick={() => setIsCreate(!isCreate)}>+</button>}
        </div>
        <DragDropContext onDragEnd={handleChangeOnDrag}>
          <Droppable droppableId="itensComponents">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} id="itensComponents">
                {listArray.map((item, index) => {
                  return (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided) => (
                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={item.id}>
                          <div className="titleCard">
                            <input type="text" maxLength={8} defaultValue={item.name} disabled />
                          </div>
                          <div className="description">
                            <span >{item.description}</span>
                          </div>
                          {title === 'Criado' && <div className="buttonsCard">
                            <button onClick={() => handleOpenModalDelete(item.id)}>Excluir</button>
                            <button onClick={() => handleNextCard(item.id, index)}>Fazer</button>
                          </div>
                          }
                          {title === 'Fazendo' && <div className="buttonsCard">
                            <button onClick={() => handleBackCard(item.id, index)}>Voltar</button>
                            <button onClick={() => handleNextCard(item.id, index)}>Concluir</button>
                          </div>
                          }

                          {title === 'Feito' && <div className="buttonsCard">
                            <button onClick={() => handleOpenModalPassword(item.id, index)}>Voltar</button>
                          </div>
                          }
                        </li>
                      )
                      }
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </ul>
            )
            }
          </Droppable>
        </DragDropContext>
      </div>
    </>
  )
}

export default Todo