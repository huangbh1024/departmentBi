export interface Project {
  id: number;
  taskName: string;
  taskProgress: string;
  taskStatus: string;
  taskAccomplishRate: string;
}

export interface User {
  id: number;
  userName: string;
  userAvatar: string;
  userOverTimeNumber: number;
}

export interface HomeCompExpose {
  init: () => void;
}

export interface SysInfo {
  id: number;
  sysBulletinBoard: string;
}
