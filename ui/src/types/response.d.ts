interface IListGetParamsBase {
	page: number;
	perPage: number;
}

interface IResponseMeta extends IListGetParamsBase {
    total: number;
}

interface IGetResponse<T> {
    data: T;
    meta: IResponseMeta;
}