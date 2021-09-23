import { CharacterDTO } from "@/graphql/DTO/CharacterDTO";
import { Episode } from "./Episode";

export class Character {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly gender: string,
    private readonly species: string,
    private readonly imageUrl: string,
    private readonly episodes: Array<Episode>,
    private readonly isFavourite: boolean = false,
  ) {}

  static fromDTO(dto: CharacterDTO): Character {
    return new Character(
      dto.id,
      dto.name,
      dto.gender,
      dto.species,
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
  getImageUrl(): string {
    return this.imageUrl;
  }
  getEpisode(): Array<Episode> {
    return this.episodes
  }
  getLatestEpisode(): Episode {
    return this.episodes[this.episodes.length - 1];
  }
  getIsFavourite(): boolean {
    return this.isFavourite;
  }
}