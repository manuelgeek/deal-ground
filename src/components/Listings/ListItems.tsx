import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { listings } from "./assets/data"
import { useState } from "react"

export const ListItems = () => {
    // Represents outsise DB, shouls be updatable
const [lists, setLists] = useState(listings)

  const [listName, setListName] = useState("")

  const queryClient = useQueryClient()

  //NOTE:  mimic fetch api/axios
  const getListings = async () => lists

  // Queries
  const query = useQuery({ queryKey: ["lists"], queryFn: getListings })

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
    setLists([item, ...lists]) 
    setListName('')
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

  return (
    <div className="w-full bg-[#E9EDF0] min-h-full pb-10">
      <div className="p-6 text-center">
        <h2 className="font-medium text-xl text-blue-600">
          Real estate Dashboard
        </h2>
        <p>Your utimate listing site</p>
      </div>
      <div className="space-x-6 px-4 md:px-20">
        <input
          className="bg-white rounded p-3 -full md:w-[400px]"
          type="text"
          name="name"
          placeholder="add name only, for demo purposes"
          onChange={(e) => setListName(e.target.value)}
          value={listName}
        />
        <button
          className="bg-blue-600 p-3 roundes"
          onClick={() => {
            mutation.mutate()
          }}
        >
          Add House
        </button>
      </div>
  
      <div className="px-4 md:px-20 mt-10 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {query?.data?.map(
            ({ image, id, price, location, insights, name }) => (
              <div className="bg-white rounded p-4" key={id}>
                <img className="" src={image} alt="img" />
                <div>
                  <div className="my-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-lg">{name}</h3>
                      <p className="rounded-full bg-blue-100 px-6 text-gray">
                        {location}
                      </p>
                    </div>
                    <h4 className="font-medium font-">
                      KES {price.toLocaleString()}
                    </h4>
                  </div>
                  <p>{insights}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
