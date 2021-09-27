import {GenderType, GenderIcon} from '@/types/types';

const iconDictionary: Array<GenderIcon> = [
  {
    name: GenderType.FEMALE,
    icon: 'female'
  },
  {
    name: GenderType.MALE,
    icon: 'male'
  },
  {
    name: GenderType.GENDERLESS,
    icon: 'close'
  },
  {
    name: GenderType.UNKNOWN,
    icon: 'minus'
  },
]
 export default iconDictionary;
