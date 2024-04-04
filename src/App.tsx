
import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


function App() {

  const queryClient = useQueryClient()

  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.coxxxm/todos').then((res) =>
        res.json()
      ),
    refetchOnWindowFocus: false,
    retry: 5
    //gcTime: 6000, // Garbage collection (default: 5 minutos )
    //staleTime: 60000, // El tiempo que se considera como fresca la data
    // refetchInterval: 5000, // el tiempo para recargar la data.
  })

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost) => fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    }).then((res) => res.json()),
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost])
      //queryClient.invalidateQueries({ queryKey: ['posts']}) 
    }
  })


  if (error || isError) return <div>There was an error!</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <div>


        <button onClick={() =>
          mutate({
            userId: 5000,
            id: 4000,
            title: "elmer omero",
            body: "Hola mundo"
          })
        }>Add New</button>

        {data.map((todo) => (
          <div key={todo.id}>
            <h2>{todo.id}</h2>
            <p>{todo.title}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
