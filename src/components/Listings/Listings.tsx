import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ListItems } from "./ListItems"

export const Listings = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ListItems />
    </QueryClientProvider>
  )
}
