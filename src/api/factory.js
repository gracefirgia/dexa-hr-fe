import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosMainClient from "./axiosInstance";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const networkProto = {
  /**
   * @param {string} endpoint Endpoint to be queried
   * @param {array} dependencies Array of dependency variables. Triggers the query everytime the dependencies change.
   * @param {import("@tanstack/react-query").UseQueryOptions} queryConfigs
   * @param {import("axios").AxiosRequestConfig} axiosConfigs
   * @returns {import("@tanstack/react-query").UseQueryResult & { invalidate: () => void }} Query result with an `invalidate` function.
   */
  Query({ endpoint, dependencies, axiosConfigs = {}, queryConfigs = {} }) {
    const queryClient = useQueryClient();

    const queries = useQuery({
      queryKey: dependencies,
      queryFn: async () => {
        try {
          const res = await axiosMainClient().get(endpoint, {
            ...axiosConfigs,
          });
          return res.data;
        } catch (error) {
          if (error?.status === 401) {
            cookies.remove("jwt_token");
          }
          return error;
        }
      },
      ...queryConfigs,
    });

    /**
     * Invalidate the query manually.
     * @returns {void}
     */
    const handleInvalidateQuery = () => {
      queryClient.invalidateQueries({ queryKey: dependencies });
    };

    return { ...queries, handleInvalidateQuery };
  },

  /**
   * @param {("post"|"put"|"delete")} method
   * @param {VoidFunction} onSuccessCallback
   * @param {array} dependencies Array of to revalidate get query.
   * @param {VoidFunction} onErrorCallback
   */
  Mutation({ method, onSuccessCallback, queryKey, onErrorCallback, axiosConfigs }) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: async ({ endpoint, data }) => {
        const res = await axiosMainClient().request(
          {
            method,
            url: endpoint,
            data,
          },
          {
            ...axiosConfigs,
          },
        );
        return res;
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey });
        onSuccessCallback(res);
      },
      onError: (err) => {
        onErrorCallback(err);
      },
    });

    return mutation;
  },
};

export default networkProto;
