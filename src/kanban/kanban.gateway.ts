import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { KanbanService } from './kanban.service';
import { Console } from 'console';
import { Task } from '@prisma/client';

// @Controller('kanban')
// export class KanbanController {}


@WebSocketGateway(3002, {
  cors: {
    origin: '*', // Replace '*' with your client URL in production for security
    methods: ['GET', 'POST'],
  },
})

export class BoardGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private boardService: KanbanService) { }

  async handleConnection() {

    console.log('Client connected');
  }

  async handleDisconnect() {
    console.log('Client disconnected');
  }

  @SubscribeMessage('getBoards')
  async getBoards(@MessageBody('companyId') companyId: string) {
    console.log('1');

    const boards = await this.boardService.getBoards(companyId);
    console.log('2');

    this.server.emit('boardsUpdated', boards);
    console.log('3');

    return boards;
  }

  @SubscribeMessage('createBoard')
  async createBoard(@MessageBody() data: { companyId: string; title: string }) {
    const board = await this.boardService.createBoard(data);
    this.server.emit('boardsUpdated', await this.boardService.getBoards(data.companyId));
    return board;
  }

  @SubscribeMessage('updateTasks')
  async updateTasks(@MessageBody() data: { boardId: string, tasks: Task[] }) {
    try {
      const updatedBoard = await this.boardService.updateTasks(data.boardId, data.tasks);

      // Emit the updated board to all connected clients
      this.server.emit('tasksUpdated', updatedBoard);

      return updatedBoard;
    } catch (error) {
      console.error('Error updating tasks via WebSocket:', error);
      throw error;
    }
  }


}
