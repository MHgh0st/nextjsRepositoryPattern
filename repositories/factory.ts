import { transform, transformPaginated } from "@/repositories/response";
import { store } from "@/state/store";
import INotification from "@/types/public/INotification";
import { NotificationType } from "@/utils/data/NotificationType";
import { assign } from "@/state/slices/notificationSlice";

interface fetchOption {
  baseURL: string;
}
export const fetcher = async (url: string, method: string, data?: object) => {
  const res = await fetch(url, {
    credentials: "include",
    method,
    body: method === "GET" ? undefined : JSON.stringify(data),
  });
  if (!res.ok) {
    let errorMessage = "Error fetching data";
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = "Failed to parse error response";
    }
    console.log("Error: ", errorMessage);
  } else return await res.json().then(transform).then(transformPaginated);
};

class FetchFactory {
  private fetchOptions: fetchOption;
  constructor(fetchOptions: fetchOption) {
    this.fetchOptions = fetchOptions;
  }

  protected async apiCaller<TResponse>(
    url: string,
    method: string,
    data?: object,
  ): Promise<TResponse> {
    const result = await fetcher(
      `${this.fetchOptions.baseURL}${url}`,
      method,
      data,
    );
    return result as TResponse;
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
