import useRequestMaker from "@/composables/useRequestMaker";

export default function useChangeFilmOrder(sortedFilms) {
  const requestMaker = useRequestMaker()

  const changeOrder = async (dropResult) => {
    const oldIndex = dropResult.droppedElementOldIndex
    const newIndex = dropResult.droppedElementNewIndex

    if (newIndex === oldIndex) {
      return
    }

    let orderPrev
    let orderNext

    if (newIndex > oldIndex) {
      orderPrev = sortedFilms.value[newIndex].order
      orderNext = sortedFilms.value[newIndex + 1] ? sortedFilms.value[newIndex + 1].order : sortedFilms.value[newIndex].order - 100
    }

    if (newIndex < oldIndex) {
      orderPrev = sortedFilms.value[newIndex - 1] ? sortedFilms.value[newIndex - 1].order : sortedFilms.value[0].order + 2000
      orderNext = sortedFilms.value[newIndex].order
    }

    let shiftedFilm = sortedFilms.value[oldIndex]

    shiftedFilm.order = Math.min(orderPrev, orderNext) + Math.abs(orderPrev - orderNext) / 2

    let response = await requestMaker.fetch('set/order', 'POST', {
      film_id: shiftedFilm.id,
      order: shiftedFilm.order
    }, [200, 403])
  }

  return {
    changeOrder
  }
}
