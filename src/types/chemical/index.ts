// 化学解析相关类型

export interface ChemicalParseRes {
  SMILES: string;
  mode_used: string;
  original_filename: string;
  status: string;
  uploaded_file_url: string;
}
