import { api } from "./api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addNote: builder.mutation({
            query: (body) => ({
                url: `/notes`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["notes"],
        }),

        getNotes: builder.query({
            query: () => ({
                url: `/notes`,
                method: "GET",
            }),
            providesTags: ["notes"],
        }),

        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/notes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["notes"],
        }),
    }),
    overrideExisting: false,
});

export const { useAddNoteMutation, useGetNotesQuery, useDeleteNoteMutation } = authApi;