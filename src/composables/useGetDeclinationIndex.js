export default function useGetDeclinationIndex() {
  const getDeclinationIndex = (count) => {
    if (count > 100) count = count % 100
    if (count <= 20 && count >= 10) return 2
    if (count > 20) count = count % 10
    return count === 1 ? 0 : count > 1 && count < 5 ? 1 : 2
  }

  return {
    getDeclinationIndex
  }
}
