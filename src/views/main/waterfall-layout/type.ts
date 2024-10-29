import type { CSSProperties } from "vue";

export interface IVirtualWaterFallProps{
    gap:number; //瀑布流中卡片之间的间隔。
    column:number; //表示瀑布流布局的列数
    pageSize:number; //表示每次请求加载的卡片数量。
    enterSize?:number; //
    request:(page:number,pageSize:number)=>Promise<ICardItem[]>;
}

export interface ICardItem{
    id:number | string
    width:number;
    height:number;
    [key:string]:any;
}

export interface IColumnQueue{
    list:IRemderItem[];
    height:number;
}

export interface IRemderItem{
    item:ICardItem;
    y:number;
    h:number;
    style:CSSProperties;
}

export interface IItemRect{
    width:number;
    height:number;
}

export interface IBookColumnQueue{
    list:IBookColumnQueue;
    height:number;
}

export interface IBookRenderItem{
    item:ICardItem;
    y:number;
    h:number;
    imageHeight:number;
    style:CSSProperties;
}

export interface IBookItemRect{
    width:number;
    height:number;
    imageHeight:number;
}