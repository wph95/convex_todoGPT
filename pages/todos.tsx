import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib/fetcher';

export default function TodoPage() {
  const router = useRouter();
  const { data: todos, isLoading, error } = useSWR('/api/todos', fetcher);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = useCallback(async () => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    });

    if (response.ok) {
      mutate('/api/todos');
      setTitle('');
      setDescription('');
    }
  }, [title, description]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos</div>;

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Todos</h1>
      <div className='mb-4'>
        <input
          className='border p-2 mr-2'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
        />
        <input
          className='border p-2'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
        />
        <button className='bg-blue-500 text-white p-2 ml-2' onClick={handleCreate}>
          Create
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className='border p-2 mb-2'>
            <h2 className='font-bold'>{todo.title}</h2>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
