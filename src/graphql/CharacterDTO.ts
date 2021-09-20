import { EpisodeDTO } from "./EpisodeDTO";

export interface CharacterDTO {
  id: number;
  name: string;
  image: string;
  status: string;
  gender: string;
  species: string;
  episode: Array<EpisodeDTO>;
}