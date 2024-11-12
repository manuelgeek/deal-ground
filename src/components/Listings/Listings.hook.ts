import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { listings } from "./assets/data"
import { useState } from "react"

export const useListings = () => {
  // Represents outsise DB, shouls be updatable
  const [lists, setLists] = useState(listings)

  const [listName, setListName] = useState("")

  const queryClient = useQueryClient()

  //NOTE:  mimic fetch api/axios
  const getListings = async () => lists

  // Queries
  const {data: listsData, isFetching, } = useQuery({ queryKey: ["lists"], queryFn: getListings })

  const handleAddList = () => {
    if (!listName) {
      alert("fill name")
      return
    }
    const item = {
      id: Math.random(),
      // NOTE: for purpose of demo, juest name
      name: listName,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/023/307/449/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg",
      insights:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      location: "Regen",
      price: 40000,
    }

    // NOTE: mimics updates to DB side
    // THis better than using refetch ad this was, tabstack query handles the cache reconsile
    setLists([item, ...lists])
    setListName("")
    return item
  }

  // Mutations
  const mutation = useMutation({
    mutationFn: handleAddList,
    onSuccess: () => {
      // Invalidate and refetch, test by removing this, list will not update
      queryClient.invalidateQueries({ queryKey: ["lists"] })
    },
  })

  return {
    listsData,
    isFetching,
    mutation,
    listName,
    setListName
  }
}
