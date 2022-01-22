export type WorksList = Work[];

export interface Work {
  id: number
  title: string
  genre: string
  composer: Composer
}

export interface Composer {
  id: number
  name: string
  complete_name: string
  epoch: string
}