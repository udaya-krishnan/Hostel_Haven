import { NotificationData } from "../../entities/Notification";

export interface AdminNotificationCase{
   sendNotification(data:NotificationData):Promise<any|null>
}