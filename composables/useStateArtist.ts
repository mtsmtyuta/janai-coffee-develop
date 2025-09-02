import type { Ref } from 'vue'

export const setArtist = (artist: Ref<any>) => (newFields: any) => {artist.value = newFields;}
export const setArtistPending = (isArtistPending: Ref<Boolean>) => (newFields: Boolean) => {isArtistPending.value = newFields;}

const fieldsDef = [
  {
    description: '',
    id: 0,
    photo: null,
    photoThumb: null,
    slug: '',
    title: '',
    job: ''
  }
]


export const useStateArtist = () => {
  const artist = useState('artist', () => fieldsDef)
  const isArtistPending = useState('isArtistPending', () => true)
  return {
    artist: readonly(artist),
    setArtist: setArtist(artist),
    isArtistPending: readonly(isArtistPending),
    setArtistPending: setArtistPending(isArtistPending),
  }
}