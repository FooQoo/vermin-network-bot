import { TemplateMessage, TextMessage } from '@line/bot-sdk';

export function getReplyGeoMessage(): (TextMessage | TemplateMessage)[] {
  return [
    {
      type: 'text',
      text: '位置情報を承りました。',
    },
    {
      type: 'template',
      altText: '被害状況の撮影',
      template: {
        type: 'buttons',
        text: '被害の状況写真をお持ちでしたら、送信していただけないでしょうか。',
        actions: [
          {
            type: 'cameraRoll',
            label: 'カメラロールから選択する',
          },
          {
            type: 'camera',
            label: 'カメラから撮影する',
          },
          {
            type: 'message',
            label: '送信しない',
            text: '送信しない',
          },
        ],
      },
    },
  ];
}
