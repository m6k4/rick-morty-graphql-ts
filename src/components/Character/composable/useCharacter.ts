import {Character} from "@/components/Character/types/Character";
import {computed, ref} from "vue";
import {useQuery} from "@vue/apollo-composable";
import {
    FavouriteOption,
    FilterOption,
    FilterType,
    GetCharactersByIdsResponseDTO,
    GetInfoResponseDTO
} from "@/types/types";
import {GET_CHARACTERS_BY_IDS_QUERY, GET_INFO_QUERY} from "@/graphql/getCharacters";
import {Info} from "@/components/Character/types/Info";

export default function useCharacter() {
    const allCharacters = ref<Array<Character>>([]);
    const filteredCharacterList = ref<Array<Character>>([]);
    const isLoading = ref<boolean>(false);
    const isError = ref<boolean>(false);

    function fetch(): void {
        isLoading.value = true;
        const infoQuery = useQuery<GetInfoResponseDTO>(GET_INFO_QUERY);

        const charactersQuery = useQuery<GetCharactersByIdsResponseDTO>(
            GET_CHARACTERS_BY_IDS_QUERY, {ids: []}
        );

        infoQuery.onResult(result => {
            const info: Info = Info.fromDTO(result.data.characters.info);
            const ids = Array.from(Array(info.getCount() + 1).keys()).slice(1);
            charactersQuery.refetch({ids});
        })


        charactersQuery.onResult(result => {
            if (result.data?.charactersByIds[0]) {
                allCharacters.value = [...result.data.charactersByIds.map(dto => Character.fromDTO(dto))];
                filteredCharacterList.value = [...result.data.charactersByIds.map(dto => Character.fromDTO(dto))];
                isLoading.value = false;
            }
        });

        isError.value = !!infoQuery.error || !!charactersQuery.error;
    }

    function filter(filter: FilterOption): void {
        switch (filter.type) {
            case FilterType.ID: {
                filteredCharacterList.value = allCharacters.value.filter(character =>
                    character.getId() === +filter.value
                )
                break;
            }
            case FilterType.EPISODE: {
                filteredCharacterList.value = allCharacters.value.filter(character =>
                    character.getEpisodes().some(episode =>
                        episode.getName() === filter.value.toUpperCase())
                );
                break;
            }
            case FilterType.NAME: {
                filteredCharacterList.value = allCharacters.value.filter(character =>
                    character.getName().toUpperCase().includes(filter.value.toUpperCase())
                );
                break;
            }
            default: {
                filteredCharacterList.value = [...allCharacters.value];
            }
        }
    }

    function setFavourite(favouriteOption: FavouriteOption): void {
        allCharacters.value.forEach(character => {
            if (character.getId() === favouriteOption.character.getId()) {
                character.setIsFavourite(favouriteOption.isFavourite);
            }
        });
        filteredCharacterList.value.forEach(character => {
            if (character.getId() === favouriteOption.character.getId()) {
                character.setIsFavourite(favouriteOption.isFavourite);
            }
        });
    }

    return {
        filteredCharacterList: computed(() => filteredCharacterList.value),
        favouriteCharacterList: computed(() => filteredCharacterList.value.filter(character => character.getIsFavourite())),
        isLoading: computed(() => isLoading.value),
        isError: computed(() => isError.value),
        fetch,
        filter,
        setFavourite
    };
}