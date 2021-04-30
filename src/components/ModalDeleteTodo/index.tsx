import React, { useCallback } from 'react'
import './styles.css'

interface IReceived {
  setIsDelete(isBoolean: boolean): any;
  handleDeleteItem(id: number | string | undefined): any
  isDelete: boolean;
  id: number | string | undefined
}

const ModalNewTodo: React.FC<IReceived> = ({ setIsDelete, isDelete, handleDeleteItem, id }: IReceived) => {
  const handleDelete = useCallback(() => {
    handleDeleteItem(id)
    setIsDelete(!isDelete)
  }, [id, isDelete, handleDeleteItem, setIsDelete])
  return (
    <div id="containerModalDelete">
      <div id="contentModalDelete">
        <div>
          <button onClick={() => setIsDelete(!isDelete)} id="cancel-button">Cancelar</button>
          <button onClick={handleDelete} id="delete-button">Deletar</button>
        </div>
      </div>
    </div>
  )
}

export default ModalNewTodo