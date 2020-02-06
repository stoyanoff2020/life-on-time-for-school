export enum MediaType {
  'image',
  'video',
  'audio'
}

export interface BlogPost {
  id: string,
  date: string,
  title: string;
  imageUrl?: string;
  content: string;
  shortContent?: string;
  link: string;
  mediaType: MediaType;
  mediaId?: string;
}
