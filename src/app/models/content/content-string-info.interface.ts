
export interface MContentStringInfo {
    id: string;
    name: string;
    domain: string;
    category: string;
    locale: string;
    contentMediaType: number;
    value: string;
    description: string;
}

export interface MContentImageInfo {
    id: string;
    name: string;
    domain: string;
    category: string;
    fileName: string;
    imageRoot: string;
    url: string;
    imageWidth: number;
    imageHeight: number;
}
