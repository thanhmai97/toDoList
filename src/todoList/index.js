import React, {useState} from 'react'
import {Button, Container} from 'react-bootstrap'
import './index.scss'

const ToDoList = () => {
    const [valueInput, setValueInput] = useState('')
    const [showEditInput, setShowEditInput] = useState(-1)
    const [updateItem, setUpdateItem] = useState([])
    const toDoList = [...updateItem]

    const getValueInput = (e) => {
        setValueInput(e.target.value)
    }

    const addToDoItem = () => {
        toDoList.push({
            id: toDoList.length + 1,
            value: valueInput
        })
        setUpdateItem(toDoList)
    }

    const editToDoItem = (object) => {
        const findItem = toDoList?.filter((item, index) => item.id === object.id)

        if (findItem) {
            setShowEditInput(object.id)
        }
    }

    const removeToDoItem = (object) => {
        debugger
        const listAfterRemove = toDoList?.findIndex((item) => item.id === object.id)

        toDoList.splice(listAfterRemove, 1)

        setUpdateItem(toDoList)
    }

    const updateToDoItem = (object) => {
        const findItem = toDoList?.findIndex((item, index) => item.id === object.id)

        if (findItem > -1) {
            toDoList[findItem].value = valueInput
            setUpdateItem(toDoList)
            setShowEditInput(-1)
        }
    }

    const renderListItems = () => {
        return (
            toDoList?.map((item, index) => {
                    return (
                        <div className={'todo-content-item'} key={item.id + index}>
                            {showEditInput !== item.id && (
                                <div className={'todo-item'}>{item.value}</div>
                            )}

                            {showEditInput === item.id && (
                                <div>
                                    <input className={'todo-edit-input'}
                                           placeholder={'Edit your to do list'}
                                           type={'text'}
                                           value={item.value}
                                           onChange={(e) => {
                                               item.value = e.target.value
                                               getValueInput(e)
                                           }}
                                    />
                                </div>
                            )}
                            {showEditInput === item.id ? (
                                <Button className={'todo-content-item-btn'} onClick={() => updateToDoItem(item)}>
                                    Save
                                </Button>
                            ) : (
                                <Button className={'todo-content-item-btn'} onClick={(e) => editToDoItem(item)}>
                                    Edit
                                </Button>
                            )}
                            <Button className={'todo-content-item-btn'} onClick={(e) => removeToDoItem(item)}>
                                Remove
                            </Button>
                        </div>
                    )
                }
            )
        )
    }

    return (
        <div className={'todo'}>
            <Container>
                <div className={'todo-header'}>
                    <h2>MeiMei To Do List</h2>
                </div>
                <div className={'todo-body'}>
                    <div className={'todo-form'}>
                        <input className={'todo-input'}
                               placeholder={'Add your to do list'}
                               type={'text'}
                               onChange={(e) => getValueInput(e)}/>
                        <Button className={'todo-btn'} onClick={() => addToDoItem()}>
                            Add
                        </Button>
                    </div>
                    <div className={'todo-content'}>
                        {renderListItems()}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ToDoList
