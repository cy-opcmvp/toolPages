
export interface Tool {
  id: string;
  name: string;
  nameEn: string;
  nameCn: string;
  description: string;
  descriptionEn: string;
  category: string;
  tags: string[];
  icon: string;
  thumbnail: string;
  path: string;
  featured: boolean;
  hot: number;
  addedDate: string;
}

export enum SortOption {
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
  HOT = 'hot',
  NEWEST = 'newest'
}

export type Language = 'en' | 'cn';

export interface Category {
  id: string;
  labelEn: string;
  labelCn: string;
}
