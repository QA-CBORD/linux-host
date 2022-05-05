import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { CONTENT_STRINGS_CATEGORIES as CATEGORIES } from 'src/app/content-strings';
import { reduceToObject } from './content-string-utils';

export interface ContentStringBuilderConfig {
  primary?: ContentStringInfo[];
  secondary?: ContentStringInfo[];
  params?: any;
}

export interface ContentStringBuilder {
  category: CATEGORIES;
  build: (config: ContentStringBuilderConfig) => ContentStringModel;
}
export interface RawContentStringObject {
  [key: string]: string;
}

export abstract class ContentStringModel {
  protected params?: any;
  content: RawContentStringObject;
  constructor(config: ContentStringBuilderConfig, defaultContentStrings: RawContentStringObject) {
    this.doSetup(config, defaultContentStrings);
  }

  protected doSetup(config: ContentStringBuilderConfig, defaultContents: any): void {
    
    const reduce = (data: ContentStringInfo[]) => reduceToObject(data);

    this.params = config.params;
    const primary = config.primary || [];
    const secondary = config.secondary || [];
    const isPrimaryContentNull = !config.primary || !config.primary.length;
    if (isPrimaryContentNull) {
      this.content = { ...reduce(secondary), ...defaultContents };
    } else {
      const data = [...primary, ...secondary];
      this.content = reduce(data);
      this.content = { ...defaultContents, ...this.content };
    }
  }

  valueByKey(key: string): string {
    return this.content[key];
  }
}

export class NullableContent {
  private constructor(private readonly config: ContentStringBuilderConfig) {}

  isNull(): boolean {
    return !this.config.primary;
  }

  getConfig(): ContentStringBuilderConfig {
    return this.config || {};
  }

  static build(builderConfig: ContentStringBuilderConfig): NullableContent {
    return new NullableContent(builderConfig);
  }
}
