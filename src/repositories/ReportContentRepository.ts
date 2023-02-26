import { PrismaClient, Report, ReportLog } from '@prisma/client';

import { findReportLog } from './ReportLogRepository';

const prisma = new PrismaClient();

export const convertReport = async (reportId: number): Promise<Report> => {
  const reportLog = await findReportLog(reportId);

  const animal = JSON.parse(getElementByType('animal', reportLog))?.animal;
  const damage = JSON.parse(getElementByType('damage', reportLog))?.imageId;
  const geo = JSON.parse(getElementByType('geo', reportLog));
  const latitude = Math.round((geo?.latitude || 0) * 1000000) / 1000000;
  const longitude = Math.round((geo?.longitude || 0) * 1000000) / 1000000;
  const point = `POINT(${latitude} ${longitude})`;

  return await prisma.$queryRaw`INSERT INTO ReportContent (reportId, animal, damage, geo, latitude, longitude, updatedAt) VALUES (${reportId}, ${animal}, ${damage}, ST_GEOMFROMTEXT(${point}, 4326), ${latitude}, ${longitude}, CURRENT_TIMESTAMP)`;
};

function getElementByType(type: string, array: ReportLog[]): string {
  return array.find((element) => element.type === type)?.content || '{}';
}
