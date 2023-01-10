import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./goodsApi";

export const store =  configureStore({
    reducer: {
        // задаю динамически имя редюсера и передаю туда редюсер, который автоматически создается в goddsApi
        [goodsApi.reducerPath]: goodsApi.reducer,
    },
    // некая логика, которая выполняется в момент запуска экшенов до их выполнения
    // getDefaultMiddlware данное название задаем мы
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(goodsApi.middleware)
});
