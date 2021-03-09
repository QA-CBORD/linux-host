import { ContentStringInfo } from '@core/model/content/content-string-info.model';

export interface DefaultCs {
  [key: string]: any;
}

export abstract class ContentStringModel {
  content: any;
  constructor(nullable: NullableContent, defaultObject: DefaultCs) {
    this.content = (nullable.isNull() && defaultObject) || nullable.getContent();
  }
}

// export interface ApiContract {
//   [key: string]: (data?: ContentStringInfo[], args?: any) => ContentStringModel | any;
// }

export class NullableContent {
  private constructor(private readonly content: unknown) {}

  isNull(): boolean {
    return !this.content;
  }

  getContent(): any {
    return this.content;
  }

  static build(data: ContentStringInfo[]): NullableContent {
    if (data && data.length) {
      const pageContents = {};
      data.forEach(({ name, value }) => (pageContents[name] = value));
      return new NullableContent(pageContents);
    }
    return new NullableContent(null);
  }
}
