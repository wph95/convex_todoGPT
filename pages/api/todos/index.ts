import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {title, description, completed} = req.body;
  
  // POST /api/todos
  // Create a new todo
  if (req.method == 'POST') {
    const todo = await prisma.todo.create({
      data: {
        title: title,
        description: description,
        completed: completed ?? false
      }
    });
    return res.status(201).json(todo);
  }
  // GET /api/todos
  // Get all todos
  if (req.method == 'GET') {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  }
  return res.status(405).json({msg: 'Method not supported'});
}