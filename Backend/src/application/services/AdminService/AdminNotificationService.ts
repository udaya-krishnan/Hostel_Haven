import { NotificationData } from '../../../domain/entities/Notification';
import {AdminNotificationCase} from '../../../domain/usecase/Admin/AdminNotificationCase'
import { AdminRepository } from "../../interfaces/Admin/AdminRepository";


export class AdminNotificationService implements AdminNotificationCase{
  constructor(private adminRepository:AdminRepository){}

  async sendNotification(data: NotificationData): Promise<any | null> {
      const response=await this.adminRepository.sendNotification(data)
      return response
  }
  
}

