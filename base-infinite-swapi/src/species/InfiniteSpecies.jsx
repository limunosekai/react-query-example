import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { Species } from './Species';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery(
      'sw-species',
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next,
      }
    );

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {isFetching && <div className='loading'>Loading...</div>}
      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((specy) => {
            return (
              <Species
                key={specy.name}
                name={specy.name}
                language={specy.language}
                averageLifespan={specy.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
