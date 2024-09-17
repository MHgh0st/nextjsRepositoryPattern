import { transform, transformPaginated } from "@/repositories/response";
import { store } from "@/state/store";
import INotification from "@/types/public/INotification";
import { NotificationType } from "@/utils/data/NotificationType";
import { assign } from "@/state/slices/notificationSlice";
import { setLoading } from "@/components/loading";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface fetchOption {
  baseURL: string;
}
export const fetcher = async <TResponse, TData = object>(
  url: string,
  method: string,
  data?: TData,
): Promise<TResponse> => {
  setLoading(true);
  const result = await queryClient.fetchQuery({
    queryKey: [url, method, data], // Use dynamic keys based on the input
    queryFn: async () => {
      const response = await fetch(url, {
        credentials: "include",
        method,
        body: method === "GET" ? undefined : JSON.stringify(data),
        headers: {
          "Content-Type": "application/json", // Set content type for POST/PUT
        },
      });
      if (!response.ok) {
        setLoading(false);
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }
      return response.json().then(transform) as TResponse; // Parse the JSON here and return it
    },
    staleTime: 20000,
  });
  setLoading(false);
  return result;
};

class FetchFactory {
  private fetchOptions: fetchOption;
  constructor(fetchOptions: fetchOption) {
    this.fetchOptions = fetchOptions;
  }

  protected async apiCaller<TResponse, TData = object>(
    url: string,
    method: string,
    data?: TData,
  ): Promise<TResponse | undefined> {
    try {
      return (await fetcher<TResponse, TData>(
        `${this.fetchOptions.baseURL}${url}`,
        method,
        data,
      ).then(transformPaginated)) as TResponse;
    } catch (error) {
      this.notifyException((error as Error).message);
      return undefined;
    }
  }
  protected async apiDataModifierCaller<TResponse, TData = object>(
    url: string,
    method: string,
    successMessage: string,
    data?: TData,
  ): Promise<TResponse | undefined> {
    try {
      const response = await fetcher<TResponse, TData>(
        `${this.fetchOptions.baseURL}${url}`,
        method,
        data,
      );
      this.notifySuccess(successMessage);
      return response;
    } catch (error) {
      this.notifyException((error as Error).message);
      return undefined;
    }
  }

  notifyException(message: string) {
    const item: INotification = {
      id: crypto.randomUUID(),
      visibility: true,
      message: message,
      duration: 2000,
      type: NotificationType.Error,
      position: "top",
      created: new Date(),
    };
    store.dispatch(assign(item));
  }
  notifySuccess(message: string) {
    const item: INotification = {
      id: crypto.randomUUID(),
      visibility: true,
      message: message,
      duration: 2000,
      type: NotificationType.Success,
      position: "top",
      created: new Date(),
    };
    store.dispatch(assign(item));
  }
}
export default FetchFactory;
