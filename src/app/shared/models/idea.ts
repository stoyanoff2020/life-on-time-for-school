export interface IdeaFile {
  name: string,
  path: any
}
export interface IdeaInfo {
  content?: string,
  files?: Array<IdeaFile>,
  images?: Array<IdeaFile>
}

export interface Idea {
  id?: string
  name?: string,
  info?: IdeaInfo,
  created_at?: string
}
