import React from 'react';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';

ListPage.propTypes = {};

function ListPage(props) {
  const todoList = [
    {
      id: 1,
      title: 'Thanh',
    },
    {
      id: 2,
      title: 'Thanh 1',
    },
    {
      id: 3,
      title: 'Thanh 2',
    },
    {
      id: 4,
      title: 'Thanh 3',
    },
  ];
  const handleTodoFormSubmit = (values) => {
    console.log('Form submit', values);
  };
  return (
    <div>
      <h3>What todo</h3>
      <TodoForm onSubmit={handleTodoFormSubmit}></TodoForm>
      <h3>TodoList</h3>
      <TodoList todoList={todoList} />
    </div>
  );
}

export default ListPage;
