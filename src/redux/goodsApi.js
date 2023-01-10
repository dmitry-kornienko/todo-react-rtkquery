import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// создаем апи с которым будем работать
export const goodsApi = createApi({
    reducerPath: 'goodsApi',
    // конкретизируем с какими сущностями работаем в рамках этого Api
    // это позволят автоматически менять состояние на фронте
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}), // базовый url
    // конечный точки (т.е здесь будут описываться запросы на сервер)
    endpoints: (build) => ({
        // для получения данных используем query у build
        // это как экшен, функция которая делает запрос
        getGoods: build.query({
            // как входной параметр можем получить лимит на количество получаемых товаров, изменяя адрес запроса
            // при этом происходит кэширование данных.
            // Запросы будут разные в зависимости от количества товаров. Но повторный запрос производиться не будет, данные храняться несколько минут
            query: (limit = '') => `goods?${limit && `_limit=${limit}`}`, // добавление к базовому url
            // на этапе получени товаров уточняем с чем мы работаем. Данная функция копируется из документации и указываются свои типы
            providesTags: (result) =>
                result
                    ? [
                        // ф-я присваиват для каждого товара из массива тип 'Products' и уникальный id
                        ...result.map(({ id }) => ({ type: 'Products', id })),
                        //  и говорит, что все это было списком этой категории
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        // добавление нового продукта
        // mutation говорит о том что с данными будут какие-либо изменения
        addGood: build.mutation ({
            query: (body) => ({
                url: 'goods',
                method: 'POST',
                body,
            }),
            // при мутации уточняю что изменилось при помощи ключа invalidatesTags
            // id: 'LIST' указывает на то, что мы работаем с такой сущностью как СПИСОК
            invalidatesTags: [{type: 'Products', id: 'LIST'}],
        }),
        deleteGood: build.mutation ({
            query: (id) => ({
                url: `goods/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}],
        })
    })
});
// получаем хуки, которые генерирует toolkit
export const { useGetGoodsQuery, useAddGoodMutation, useDeleteGoodMutation } = goodsApi;