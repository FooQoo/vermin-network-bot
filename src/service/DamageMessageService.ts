import { ImageEventMessage, TemplateMessage, TextMessage } from '@line/bot-sdk';

import { createReportLog } from '../repositories/ReportLogRepository';
import { ReportMessage } from '../types/ReportMessageType';

export async function getReplyDamageMessage(
  reportId: number,
  eventMessage: ImageEventMessage
): Promise<(TextMessage | TemplateMessage)[]> {
  const { id } = eventMessage;

  await createReportLog(reportId, ReportMessage.DAMAGE, `{"imageId", "${id}"}`);

  return [
    {
      type: 'text',
      text: '被害報告を承りました。\nご報告ありがとうございました。',
    },
    {
      type: 'text',
      text: '周辺にお住まいの方にもご注意いただくため、今回の被害発生についてLINE登録の皆様にお知らせします。\nまた今後、役場より周辺のパトロールを行います。\n通報にご協力いただきありがとうございました。',
    },
  ];
}
