// 翻译相关类型

export interface TranslateRequest {
  from: string;
  to: string;
  chinese_text: string;
}

export interface TranslateRes {
  out_text: string;
}
