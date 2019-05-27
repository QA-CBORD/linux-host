export interface ContentStringInfo {
  id: string;
  name: string;
  domain: string;
  category: string;
  locale: string;
  contentMediaType: number;
  value: string;
  description: string;
}

export interface ContentImageInfo {
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
