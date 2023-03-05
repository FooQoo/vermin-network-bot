import { Message } from '@line/bot-sdk';
import { ReportContent } from '@prisma/client';

import { getAnimalOptionByKeyword } from '../types/AnimalOption';

export const getAlertMessage = async (
  report: ReportContent
): Promise<Message[]> => {
  return [
    {
      type: 'text',
      text: `本日${report.createdAt.getHours()}時${report.createdAt.getMinutes()}分に、\n${
        report.address
      }において、${getAnimalOptionByKeyword(
        report.animal
      )}の報告がありました。\n\n周辺の地域の方は\n改めて柵やフェンスが破損してないか点検し、\n被害防止に努めるようにしてください。`,
    },
    {
      type: 'location',
      title: '被害発生場所',
      address: report.address,
      latitude: report.latitude,
      longitude: report.longitude,
    },
  ];
};
