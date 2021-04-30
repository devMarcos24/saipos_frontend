import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import './styles.css'

interface IReceived {
  setIsPassword(isBoolean: boolean): any;
  handleBackCard(id: number | string | undefined, index: number | string | undefined): any
  isPassword: boolean;
  id: number | string | undefined;
  index: number | undefined;
}

const ModalNewTodo: React.FC<IReceived> = ({ isPassword, setIsPassword, handleBackCard, id, index }: IReceived) => {
  const [password, setPassword] = useState('')
  const handleIsBack = useCallback(() => {
    if (password !== "TrabalheNaSaipos") {
      console.log(index, id)
      return toast.error('A senha é invalida, tente novamente!')
    } else {
      handleBackCard(id, index)
      setIsPassword(!isPassword)
      return toast.success('O card voltará para fazendo')
    }

  }, [id, index, handleBackCard, setIsPassword, isPassword, password])

  return (
    <div id="containerModalPassword">
      <div id="contentModalPassword">
        <div id="titlePassword">
          <strong>Digite a senha</strong>
        </div>
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
        <div>
          <button onClick={() => setIsPassword(!isPassword)} id="cancel-button-password">Cancelar</button>
          <button onClick={handleIsBack} id="delete-button-password">Enviar</button>
        </div>
      </div>
    </div>
  )
}

export default ModalNewTodo