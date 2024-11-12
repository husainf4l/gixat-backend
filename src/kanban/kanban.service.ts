import { Injectable } from '@nestjs/common';
import { Board, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KanbanService {
    constructor(private prisma: PrismaService) {}

    /**
     * Creates a new board for the current user
     */
    async createBoard(data: { companyId: string; title: string }): Promise<Board> {


      return this.prisma.board.create({
        data: {
          ...data,
          tasks: {
            create: [{ description: 'Hello!', label: 'yellow' }]
          }
        }
      });
    }
  
    /**
     * Get all boards owned by current user
     */
    async getUserBoards(companyId: string): Promise<Board[]> {
      return this.prisma.board.findMany({
        where: { companyId },
        orderBy: { priority: 'asc' }
      });
    }
  
    /**
     * Run a batch write to change the priority of each board for sorting
     */
    async sortBoards(boards: Board[]): Promise<void> {
      const updateOperations = boards.map((board, idx) => 
        this.prisma.board.update({
          where: { id: board.id },
          data: { priority: idx }
        })
      );
      await this.prisma.$transaction(updateOperations);
    }
  
    /**
     * Delete board
     */
    async deleteBoard(boardId: string): Promise<void> {
      await this.prisma.board.delete({
        where: { id: boardId }
      });
    }
  
    /**
     * Updates the tasks on a board
     */
    async updateTasks(boardId: string, tasks: Task[]): Promise<Board> {
      await this.prisma.task.deleteMany({ where: { boardId } }); // Clear current tasks
      return this.prisma.board.update({
        where: { id: boardId },
        data: { tasks: { create: tasks } }
      });
    }
  
    /**
     * Remove a specific task from the board
     */
    async removeTask(boardId: string, taskId: string): Promise<Board> {
      await this.prisma.task.delete({
        where: { id: taskId }
      });
      return this.prisma.board.findUnique({ where: { id: boardId } });
    }
  
}
