import { CharacterDTO } from "./CharacterDTO";
import { InfoDTO } from "./InfoDTO";

export interface GetCharactersResponseDTO {
  characters: {
    results: Array<CharacterDTO>
    info: InfoDTO
  }
}