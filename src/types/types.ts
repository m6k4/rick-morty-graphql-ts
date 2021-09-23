export enum AvailableFilters {
  NAME = 'name',
  ID = 'id',
  EPISODE = 'episode'
}
export type Filter = Array<{[key in keyof typeof AvailableFilters]: string | number}>;
