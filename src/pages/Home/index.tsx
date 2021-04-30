import React, { useCallback, useEffect, useState } from 'react';
import { MdBorderColor, MdInsertChart, MdCloudDone } from 'react-icons/md'
import { createNothing, getAll } from '../../services/todo'
import logo from '../../assets/saiposlogo.svg'
import Todo from '../../components/Todo';
import './style.css'
import { toast } from 'react-toastify';

const Home: React.FC = () => {
  const [todoCreated, setTodoCreated] = useState<any[]>([])
  const [todoDoing, setTodoDoing] = useState<any[]>([])
  const [todoCompleted, setTodoCompleted] = useState<any[]>([])
  const [isNothing, setIsNothing] = useState<boolean>(false)

  useEffect(() => {
    async function getAllTodo() {
      try {
        const response: any[] | undefined = await getAll()
        const created = response.filter(cre => cre.status === "created")
        const doing = response.filter(cre => cre.status === "doing")
        const completed = response.filter(cre => cre.status === "completed")

        setTodoCreated(created)
        setTodoDoing(doing)
        setTodoCompleted(completed)

        if (!created.length && !doing.length) {
          setIsNothing(true)
        } else {
          setIsNothing(false)
        }

      } catch (error) {
        console.log(error.message)
      }
    }


    getAllTodo()
  }, [])

  const handleCreateRandomCard = useCallback(async () => {
    try {
      await createNothing()

      window.location.reload()
    } catch (error) {
      toast.error("Error ao criar os cardes aleatorios")
    }

  }, [])
  return (
    <>
      <div id="container">
        <div id="content">
          <Todo setIsNothing={setIsNothing} setTodoDoing={setTodoDoing} List={todoCreated} Icon={MdBorderColor} setTodoCreated={setTodoCreated} todoCreated={todoCreated} todoDoing={todoDoing} title="Criado" />
          <Todo setIsNothing={setIsNothing} setTodoCompleted={setTodoCompleted} setTodoCreated={setTodoCreated} todoDoing={todoDoing} todoCreated={todoCreated} todoCompleted={todoCompleted} List={todoDoing} Icon={MdInsertChart} title="Fazendo" />
          <Todo setIsNothing={setIsNothing} setTodoDoing={setTodoDoing} List={todoCompleted} todoDoing={todoDoing} todoCreated={todoCreated} Icon={MdCloudDone} title="Feito" />
          <div id="logo">
            <img src={logo} alt="Logo Saipos" />
          </div>
        </div>
      </div>
      {isNothing && <button onClick={handleCreateRandomCard} id="button-nothing">Estou sem tarefas</button>}
    </>
  )
}

export default Home