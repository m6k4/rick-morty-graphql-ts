import { computed, Ref, ref } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { Character } from "../Character/Character";
import { GetCharactersByIdsResponseDTO } from '../../graphql/DTO/GetCharactersByIdsResponseDTO';

const currentPageAllCharacters = ref<number>(1);
const currentPageListCharacters = [];
const pageSize = 8;
const isLoadingAll = ref(false);

export const useGetCharacter = (): {
  currentPageAllCharacters: Ref<number>;
  pageSize: number;
  isLoadingAll: Ref<boolean>;
  currentPageListCharacters: any;
  getCharactersByIds: (charactersIds: Array<number>) => any;
} => {
  
  const getCharactersByIds = (charactersIds: Array<number>) => {
    const { result, error, onResult, networkStatus, refetch } = useQuery<GetCharactersByIdsResponseDTO>(GET_CHARACTERS_BY_IDS_QUERY, {
      ids: charactersIds,
    })
  
    return useResult(
      result,
      [],
      data => data?.charactersByIds.map(dto => Character.fromDTO(dto))
    )};

  return {
   currentPageAllCharacters,
   pageSize,
   isLoadingAll: computed(() => isLoadingAll.value),
   currentPageListCharacters,
   getCharactersByIds,
  }
}