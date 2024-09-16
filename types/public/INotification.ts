import type { NotificationType } from "@/utils/data/NotificationType";

export default interface INotification {
  id: string;
  visibility: boolean;
  message: string;
  duration: number;
  type: NotificationType;
  position: string;
  created: Date;
}
