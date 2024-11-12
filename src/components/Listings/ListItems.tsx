import { useListings } from "./Listings.hook"

export const ListItems = () => {
  const { listsData, isFetching, mutation, listName, setListName } =
    useListings()

  if (isFetching) {
    // TODO: style better
    return <div>Loading ...</div>
  }

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
          {listsData?.map(({ image, id, price, location, insights, name }) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}
