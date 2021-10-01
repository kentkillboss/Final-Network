// import axiosClient from './axiosClient';
// const productApi = {
//   async getAll(params) {
//     const newParams = { ...params };
//     newParams._start = !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 50);
//     delete newParams._page;
//     delete newParams['category.name'];

//     const productList = await axiosClient.get('/products', { params: newParams });
//     const count = await axiosClient.get('/products/count', { params: newParams });

//     return {
//       data: productList,
//       pagination: {
//         page: params._page,
//         limit: params._limit,
//         total: count,
//       },
//     };
//   },
//   get(id) {
//     const url = `/products/${id}`;
//     return axiosClient.get(url);
//   },
//   add(data) {
//     const url = '/products';
//     return axiosClient.post(url, data);
//   },
// };

// export default productApi;
