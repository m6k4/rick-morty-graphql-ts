export enum AvailableFilters {
  NAME = 'name',
  ID = 'id',
  EPISODE = 'episode'
}
export type Filter = { [key in keyof typeof AvailableFilters]: string | number};