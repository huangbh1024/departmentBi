import { request } from '@/utils/request';
import { Project, SysInfo, User } from '@/types';

/**
 * 4、查询标准品项目进度
 */
export const queryStandProjectProgress = () =>
  request<{ accomplishedCount: number; projectInfoList: Project[] }>({
    url: 'homePage/queryStandProjectProgress',
    method: 'post',
  });

/**
 * 5、查询重大项目进度
 */
export const queryImportantProjectProgress = () =>
  request<{ accomplishedCount: number; projectInfoList: Project[] }>({
    url: 'homePage/queryImportantProjectProgress',
    method: 'post',
  });

/**
 * 9、查询公告
 */
export const querySysInfo = () =>
  request<SysInfo[]>({
    url: 'sysInfo/querySysInfo',
    method: 'post',
  });

/**
 * 7、根据排序规则查加班时长前n名
 */
export const queryMostOverTimeUser = (data: { limit: number; overTimeSort: string }) =>
  request<User[]>({
    url: '/homePage/queryMostOverTimeUser',
    method: 'post',
    data,
  });

/**
 * 8、更新所有数据
 */
export const doRefreshAllData = () =>
  request({
    url: 'system/syncData/doRefreshAllData',
    method: 'post',
  });
