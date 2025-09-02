import type { Ref } from 'vue'

export const setIsPageBar = (isPageBar: Ref<Boolean>) => () => {isPageBar.value = !isPageBar.value}


export const useStateIsPageBar = () => {
  const isPageBar = useState('isPageBar', () => false)
  return {
    isPageBar: readonly(isPageBar),
    setIsPageBar: setIsPageBar(isPageBar)
  }
}