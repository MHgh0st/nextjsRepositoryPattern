export class ApiResponsePaginated<T> {
  data?: T;
  succeeded?: boolean;
  errors: any;
  pageIndex?: number;
  totalPages?: number;
  totalItems?: number;
}

export class ApiResponse<T> {
  data?: T;
  succeeded?: boolean;
  errors: any;
}

export class PostResponse {
  id?: number;
}

export const transformPaginated = (
  response: any,
): Promise<ApiResponsePaginated<any>> => {
  if (response.data.data) {
    return new Promise((resolve, reject) => {
      const result: ApiResponsePaginated<any> = {
        data: response.data.data,
        pageIndex: response.data.pageIndex,
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
        succeeded: response.succeeded,
        errors: response.errors,
      };
      resolve(result);
    });
  } else {
    return response;
  }
};
export const transform = (response: any): Promise<ApiResponse<any>> => {
  return new Promise((resolve, reject) => {
    const result: ApiResponse<any> = {
      data: response.data,
      succeeded: response.succeeded,
      errors: response.message,
    };
    resolve(result);
  });
};

export const transformToFlat = (response: any): Promise<ApiResponse<any>> => {
  return new Promise((resolve, reject) => {
    const result: ApiResponse<any> = {
      data: response.data,
      succeeded: response.succeeded,
      errors: response.message,
    };
    resolve(result);
  });
};

export const transformToPostResponse = (
  response: any,
): Promise<PostResponse> => {
  return new Promise((resolve, reject) => {
    const result: PostResponse = {
      id: response.data.id,
    };
    resolve(result);
  });
};
