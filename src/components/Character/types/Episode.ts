import {EpisodeDTO} from "@/types/types";

export class Episode {
  constructor(private readonly name: string) {
  }

  static fromDTO(dto: EpisodeDTO): Episode {
    return new Episode(dto.episode);
  }

  getName(): string {
    return this.name;
  }
}