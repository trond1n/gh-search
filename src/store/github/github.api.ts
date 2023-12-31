import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRepo, IUser, ServerResponse } from "../../models/models";
export const githubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: ServerResponse) => response.items,
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (userName: string) => ({
        url: `users/${userName}/repos`,
      }),
    }),
    createUser: build.mutation<IRepo[], string>({
        query: ()=>``

    })
  }),
});
export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
