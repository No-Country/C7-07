import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMessage } from "../interfaces/IMessage";
import { IPost } from "../interfaces/IPost";
import { IUser } from "../interfaces/IUser";

export type SetPost = {
  description: IPost["description"];
  media: IPost["media"] | ArrayBuffer | null;
};

type GetAllPostsResponse = IMessage<Omit<IPost<[IUser]>, "comments">[]>;

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSWduYWNpbyBGZWRvcmVuY28iLCJlbWFpbCI6ImlnbmFjaW9mZWRvcmVuY28yMzE3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJHBhc3MxMjMiLCJhbGlhcyI6IklnbkZlZCIsInVzZXJUeXBlIjoiQWdlbmN5IiwiZGVzY3JpcHRpb24iOiJUcmF2ZWwgQWdlbmN5IiwiY29udGFjdHMiOnsid2hhdHNhcHAiOiIzMjE5MTMxOTgyNzM4In0sImlkIjoiNjM0Y2U0ZDhlYjFiYmQyZjlmMjkwZWFhIiwiaWF0IjoxNjY1OTgzNzA0fQ.rNcqm39rhKh5ViM24TRqyzYFRdfvUnCZbfW-A3Kc6Dw";
export const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<
      IMessage<Omit<IPost<[IUser]>, "comments">[]>,
      undefined
    >({
      query: () => `/posts`,
      providesTags: ["Post"],
      transformResponse: (response: GetAllPostsResponse) => {
        const sortedData = response.data?.sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        );
        if (sortedData) {
          return {
            ...response,
            data: sortedData,
          };
        }
        return response;
      },
    }),
    setLike: builder.mutation<
      IMessage<Omit<IPost<[IUser]>, "comments" | "reactions">[]>,
      string
    >({
      query: (id) => ({
        url: `/posts/like/${id}`,
        method: "POST",
      }),

      invalidatesTags: ["Post"],
    }),
    setPost: builder.mutation<IMessage<IPost<[IUser]>>, SetPost>({
      query: (obj) => {
        console.log(obj);
        return {
          url: "/posts",
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetAllPostsQuery, useSetLikeMutation, useSetPostMutation } =
  socialApi;
