
export interface ComplainantDetails {
  name: string;
  address: string;
  city: string;
  phone: string;
}

export interface OppositePartyDetails {
  name: string;
  address: string;
}

export interface ComplaintData {
  complainant: ComplainantDetails;
  oppositeParty: OppositePartyDetails;
  facts: string;
  legalGrounds: string;
  relief: string;
  declaration: boolean;
}

export interface ComplaintDraft {
  complaint_text: string;
  sections_referenced: string[];
  download_url: string;
}
