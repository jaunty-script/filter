export default class FiltererResponse {
  public success: boolean;
  public filteredValue: Object;
  public errors: string[];
  public errorMessage: string;
  public unknowns: Object;

  constructor(
    filteredValue: Object,
    errors: string[],
    unknowns: Object,
  ) {
    this.success = errors.length === 0;
    this.filteredValue = filteredValue;
    this.errors = errors;
    this.errorMessage = this.success ? null : errors.join('\n');
    this.unknowns = unknowns;
  }
}
