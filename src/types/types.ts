// Filters
import {Character} from "@/components/Character/types/Character";

export enum FilterType {
    NAME = 'name',
    ID = 'identifier',
    EPISODE = 'episode'
}

export enum GenderType {
    FEMALE = 'Female',
    MALE = 'Male',
    GENDERLESS = 'Genderless',
    UNKNOWN = 'unknown'
}

export interface GenderIcon { 
    name: GenderType,
    icon: string
};
export interface Filter { 
    type: FilterType 
};

export interface FilterOption { 
    type: FilterType, 
    value: string 
};

export interface FavouriteOption {
    character: Character,
    isFavourite: boolean
}

// DTO
export interface CharacterDTO {
    id: number;
    name: string;
    image: string;
    status: string;
    gender: string;
    species: string;
    episode: Array<EpisodeDTO>;
}

export interface EpisodeDTO {
    episode: string;
}

export interface GetCharactersByIdsResponseDTO {
    charactersByIds: Array<CharacterDTO>
}

export interface GetInfoResponseDTO {
    characters: {
        info: InfoDTO
    }
}

export interface InfoDTO {
    count: number;
    pages: number;
    next: number;
    prev: number;
}