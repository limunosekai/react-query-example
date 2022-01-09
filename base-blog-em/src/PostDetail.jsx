import { useQuery, useMutation } from 'react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isLoading, isError } = useQuery(['comments', post.id], () =>
    fetchComments(post?.id)
  );

  const {
    mutate: deleteMutate,
    isError: isErrorDelete,
    isLoading: isLoadingDelete,
    isSuccess: isSuccessDelete,
  } = useMutation((postId) => deletePost(postId));

  const {
    mutate: updateMutate,
    isError: isErrorUpdate,
    isLoading: isLoadingUpdate,
    isSuccess: isSuccessUpdate,
  } = useMutation((postId) => updatePost(postId));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutate(post.id)}>Delete</button>
      {(isErrorDelete || isErrorUpdate) && <p>Error</p>}
      {(isLoadingDelete || isLoadingUpdate) && <p>Loading</p>}
      {(isSuccessDelete || isSuccessUpdate) && <p>Success</p>}
      <button onClick={() => updateMutate(post.id)}>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
