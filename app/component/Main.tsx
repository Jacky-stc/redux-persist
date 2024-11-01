'use client'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { Todos } from '../types/todo'
import { addTodo, deleTodo, finishTodo, updateTodoContent } from '../lib/features/countSlice'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from '@nextui-org/react'


const Main = () => {
    const [inputText, setInputText] = useState<string>("")
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [selectedTodo, setSelectedTodo] = useState<Todos>()
    const dispatch = useAppDispatch()
    const todos:Todos[] = useAppSelector(state=> state.todo.todos)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputText(e.target.value)
    }
    const handleAddTodo = ()=>{
        if(inputText === ""){
            return
        }
        dispatch(addTodo({id:new Date().toLocaleString(), text:inputText, finish:false, content:""}))
        setInputText("")
    }
    const handleDelete = (id:string)=>{
        dispatch(deleTodo(id))
    }
    const handleFinished =(id:string)=>{
      dispatch(finishTodo(id))
    }
    const handleEnter = (e:React.KeyboardEvent<HTMLInputElement>)=>{
      if(e.key === 'Enter'){
        handleAddTodo()
      }
    }
    const handleSelected = (id:string)=>{
      const selectedItem = todos.filter((todo)=> todo.id === id)[0]
      setSelectedTodo(selectedItem)
    }
    const handleModalClose = ()=>{
      dispatch(updateTodoContent({id:selectedTodo?.id, content:selectedTodo?.content}))
    }
    return (
    <div className='dark' id='main'>
      <h1>Home</h1>
        <Input type='text' spellCheck={false} className="max-w-xs inline-block mb-4" placeholder='Type in your todo list' onChange={(e)=>handleChange(e)} onKeyDown={(e)=>{handleEnter(e)}} value={inputText}></Input>
        <button className=' rounded-full w-6 h-6 align-middle text-center mx-2 hover:-translate-y-1 active:translate-y-0 bg-slate-50 text-slate-900' onClick={handleAddTodo}>+</button>
        <Table aria-label="Example static collection table" className='dark'>
      <TableHeader>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>TEXT</TableColumn>
        <TableColumn>CREATED TIME</TableColumn>
        <TableColumn>DELETE</TableColumn>
      </TableHeader>
      <TableBody>
        {todos.map((todo)=>
          <TableRow key={todo.id} onClick={()=>{
            handleSelected(todo.id)
            onOpen()
            }} className='cursor-pointer hover:bg-neutral-800 rounded-lg'>
            <TableCell>
              <Checkbox isSelected={todo.finish} onClick={()=>handleFinished(todo.id)}></Checkbox>
            </TableCell>
            <TableCell className={`${todo.finish? 'line-through text-neutral-500':''}`}>{todo.text}</TableCell>
            <TableCell className={`${todo.finish? 'line-through text-neutral-500':''}`}>{todo.id}</TableCell>
            <TableCell onClick={()=>handleDelete(todo.id)}>
              <Button color="danger" variant="light" size='sm' onClick={()=>handleDelete(todo.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <Modal isOpen={isOpen} onClose={handleModalClose} onOpenChange={onOpenChange} placement='top' closeButton className='dark' motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}>
      <ModalContent>       
        <ModalHeader>
          {selectedTodo?.text}
        </ModalHeader>
        <ModalBody>
          <label className='text-sm'>目前進度</label>
          <Textarea value={selectedTodo?.content} onChange={(e)=>setSelectedTodo((prev)=>({id:prev?.id || "", text:prev?.text || "", finish:prev?.finish || false, content:e.target.value}))}>
          </Textarea>
        </ModalBody>
        <ModalFooter>
          {selectedTodo?.id}
        </ModalFooter>
      </ModalContent>
    </Modal>
    </div>
  )
}

export default Main
