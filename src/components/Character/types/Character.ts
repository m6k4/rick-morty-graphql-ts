import { Episode } from "./Episode";
import {CharacterDTO} from "@/types/types";

export class Character {

  private isFavourite = false;

  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly gender: string,
    private readonly species: string,
    private readonly status: string,
    private readonly imageUrl: string,
    private readonly episodes: Array<Episode>
  ) {}

  static fromDTO(dto: CharacterDTO): Character {
    return new Character(
      dto.id,
      dto.name,
      dto.gender,
      dto.species,
      dto.status,
      dto.image,
      dto.episode.map(episode => Episode.fromDTO(episode))
    )
  }
    
  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getGender(): string {
    return this.gender;
  }

  getSpecies(): string {
    return this.species;
  }

  getStatus(): string {
    return this.status;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getEpisodes(): Array<Episode> {
    return this.episodes
  }

  getLatestEpisode(): Episode {
    return this.episodes[this.episodes.length - 1];
  }

  getIsFavourite(): boolean {
    return this.isFavourite;
  }

  setIsFavourite(status: boolean): void {
    this.isFavourite = status;
  }

}