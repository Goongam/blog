import { baseUrl } from "../../constants";
import { useInfiniteQuery } from "react-query";




const fetchUrl = async (url) => {
    const res = await fetch(url);
    return res.json();
}

export function useArticleListWithCate(category){

    const initialUrl = `${baseUrl}/category/${category}/1`;

    const fallback = [];

    const {
        data = fallback,
        fetchNextPage, //pageParam에 저장된 다음url을 불러옴
        hasNextPage, //pageParam에 url이 저장되 있는지 확인
        isLoading,
        isFetched,
        refetch
    } = useInfiniteQuery(['articlelist',category],
            ({pageParam = initialUrl}) => fetchUrl(pageParam),
            {
                getNextPageParam: (lastPage) => lastPage.next ? `${baseUrl}/category/${category}/${lastPage.next}` : undefined
            });

    return { data, fetchNextPage, hasNextPage, isLoading, isFetched, refetch };
}