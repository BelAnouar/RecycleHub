import { WasteType } from './waste-type.model';
import { TimeSlot } from './time-slot.model';
import { RequestStatus } from './request-status.model';

export interface CollectionRequest {
  id?: number;
  userId: number;
  wasteTypes: WasteType[];
  weight: number;
  address: string;
  date: Date;
  timeSlot: TimeSlot;
  status: RequestStatus;
  notes?: string;
  collectorId?: number;
  photos?: string[];
}