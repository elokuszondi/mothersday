export interface QuoteType {
  id: number;
  text: string;
  attribution?: string;
}

export interface TributePersonType {
  id: string;
  name: string;
  relation: string;
  description: string;
  imageSrc: string;
  quotes: QuoteType[];
  memories: string[];
  traits: string[];
  isSpecial?: boolean;
}