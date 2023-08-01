import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string; 
  const {title, description, completed} = req.body;
  
  // PUT /api/todos/{id}
  // Update a todo
  if (req.method == 'PUT') {
    const todo = await prisma.todo.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
        completed: completed
      }
    });
    return res.json(todo);
  }
  return res.status(405).json({msg: 'Method not supported'});
}