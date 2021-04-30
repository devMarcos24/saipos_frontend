import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { create } from '../../services/todo'
import { test } from '../../services/email'
import './styles.css'

interface IReceived {
  setIsCreate(isBoolean: boolean): any;
  isCreate: boolean;
}

const ModalNewTodo: React.FC<IReceived> = ({ setIsCreate, isCreate }: IReceived) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('created')

  const handleCreate = useCallback(async () => {
    try {
      if (!name || !email || !description) {
        throw new Error('Preencha todos os campos para criar o card')
      }

      // eslint-disable-next-line no-useless-escape
      if (!/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,})+)$/.test(email)) {
        throw new Error('O formato do email não é valido')
      }

      const response = await test(email)

      if (!response.smtp_check) {
        throw new Error('O email não é valido')
      }

      await create({ name, email, description, status })

      toast.success('Todo Criada com sucesso')
      window.location.reload()
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }

  }, [name, email, description, status])
  return (
    <div id="containerModal">
      <div id="contentModal">
        <input
          placeholder="Digite seu nome"
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="Name"
        />
        <input
          placeholder="example@saipos.com.br"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="Name"
        />
        <textarea placeholder="Digite a descrição aqui..." onChange={(e) => setDescription(e.target.value)} />
        <div id="containerFooter">
          <select onChange={(e) => setStatus(e.target.value)} defaultValue="created" name="" id="">
            <option value="created">Criar</option>
            <option value="doing">Fazer</option>
            <option value="completed">Concluir</option>
          </select>

          <div>
            <button onClick={() => setIsCreate(!isCreate)}>Cancelar</button>
            <button onClick={handleCreate}>Criar</button>
          </div>
        </div>
        <button id="close" onClick={() => setIsCreate(!isCreate)}>X</button>
      </div>
    </div>
  )
}

export default ModalNewTodo