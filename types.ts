export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: 'pen' | 'layers' | 'monitor' | 'palette';
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  color: string;
}