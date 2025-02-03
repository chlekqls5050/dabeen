export interface tripData {
    addr1:string;
    addr2:string;
    firstimage:string;
    tel:string;
    title:string;
    contentid:string;
    mapx?:string;
    mapy?:string;
    areacode?:string;
    sigungucode?:string;
    contenttypeid?:string;
    cat1:string;
    cat2:string;
    cat3:string;
    name?:string;
    homepage?:string;
}
export type infoItemProps = tripData & {
    eventstartdate?: string;
    eventenddate?:string;
    restdate?:string;
    playtime?:string;
    usetimefestival?:string;
    treatmenu?:string;
    parking?:string;
    distance?:string;
    fairday?:string;
    opentime?:string;
    saleitem?:string;
};
export interface repeatItemProps {
    infotext?: string;
};

export type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    creation_date: string;
    type: string;
    password:string;
};
  