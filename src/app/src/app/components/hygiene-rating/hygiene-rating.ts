export interface HygieneRating {
  Header: Header;
  EstablishmentCollection: EstablishmentCollection;
}

export interface Header {
  ExtractDate: string;
  ItemCount: number;
  ReturnCode: string;
}

export interface EstablishmentCollection {
  EstablishmentDetail: EstablishmentDetail;
}

export interface EstablishmentDetail {
  FHRSID: number;
  ChangesByServerID: number;
  LocalAuthorityBusinessID: string;
  BusinessName: string;
  BusinessType: string;
  BusinessTypeID: number;
  RatingValue: string;
  RatingKey: string;
  RatingDate: string;
  scores: Scores;
}

export interface Scores {
  Hygiene: number;
}
