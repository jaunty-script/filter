import ArrayFilter from '../Filter/ArrayFilter';
import BooleanFilter from '../Filter/BooleanFilter';
import DateFilter from '../Filter/DateFilter';
import FilterException from '../Error/FilterException';
import FiltererResponse from '../Filterer/FiltererResponse';
import FloatFilter from '../Filter/FloatFilter';
import IntegerFilter from '../Filter/IntegerFilter';
import JSONFilter from '../Filter/JSONFilter';
import StringFilter from '../Filter/StringFilter';

type Options = {
  allowUnknowns?: boolean;
  defaultRequired?: boolean;
  filterAliases?: Object;
};

type FilterSpecification = {
  conflictsWith?: string|string[]|null,
  customError?: string,
  defaultValue?: any,
  filters: {}|[],
  required?: boolean,
};

const DEFAULT_FILTER_ALIASES = {
  array: ArrayFilter.filter,
  arrayize: ArrayFilter.arrayize,
  bool: BooleanFilter.filter,
  boolConvert: BooleanFilter.convert,
  compressString: StringFilter.compress,
  concat: StringFilter.concat,
  date: DateFilter.filter,
  dateFormat: DateFilter.format,
  flatten: ArrayFilter.flatten,
  float: FloatFilter.filter,
  in: ArrayFilter.in,
  int: IntegerFilter.filter,
  json: JSONFilter.parse,
  object: filterObject,
  ofObjects,
  ofScalars,
  redact: StringFilter.redact,
  split: StringFilter.split,
  string: StringFilter.filter,
  stripTags: StringFilter.stripTags,
  translate: StringFilter.translate,
  uint: IntegerFilter.unsigned,
  validateJSON: JSONFilter.validate,
};

const DEFAULT_OPTIONS = {
  allowUnknowns: false,
  defaultRequired: false,
  filterAliases: DEFAULT_FILTER_ALIASES,
};

export default class Filterer {
  private specification: Object;
  private allowUnknowns: boolean;
  private defaultRequired: boolean;
  private filterAliases: Object;

  static get DEFAULT_FILTER_ALIASES(): Object {
    return DEFAULT_FILTER_ALIASES;
  }

  static get DEFAULT_OPTIONS(): Options {
    return DEFAULT_OPTIONS;
  }

  constructor(specification: Object, options: Options = {}) {
    const {
      allowUnknowns = DEFAULT_OPTIONS.allowUnknowns,
      defaultRequired = DEFAULT_OPTIONS.defaultRequired,
      filterAliases = DEFAULT_OPTIONS.filterAliases,
    } = options;
    this.specification = specification;
    this.allowUnknowns = allowUnknowns;
    this.defaultRequired = defaultRequired;
    this.filterAliases = filterAliases;
  }

  execute(input: Object): FiltererResponse {
    const inputToFilter = objectIntersection(input, this.specification);
    const leftOverSpec = objectDifference(this.specification, input);
    const leftOverInput = objectDifference(input, this.specification);

    let errors = [];
    let conflicts = {};
    Object.entries(inputToFilter).forEach(([field, fieldValue]) => {
      let filters = this.specification[field];
      let result = fieldValue;
      assertFiltersIsAnObjectOrArray(filters, field);
      let customError: string;
      if (!Array.isArray(filters)) {
        customError = validateCustomError(filters, field);
        conflicts = extractConflicts(filters, field, conflicts);
        filters = filters.filters;
        if (filters == null) {
          filters = [[]];
        }
        assertFiltersIsAnArray(filters, field);
      }
      filters.forEach((filter: any[]) => {
        assertFilterIsAnArray(filter, field);
        if (filter.length === 0) {
          return;
        }
        const filterArguments = [...filter];
        let filterFunction = filterArguments.shift();
        filterFunction = handleFilterAliases(filterFunction, this.filterAliases);
        assertFilterFunctionIsFunction(filterFunction, field);
        try {
          result = filterFunction(result, ...filterArguments);
        } catch (error) {
          errors = handleCustomError(field, result, error, errors, customError);
        }
      });
      inputToFilter[field] = result;
    });
    Object.entries(leftOverSpec).forEach(([field, filters]) => {
      assertFiltersIsAnObjectOrArray(filters, field);
      let required = this.defaultRequired;
      if (!Array.isArray(filters)) {
        required = getRequired(filters, this.defaultRequired, field);
        if (typeof filters.defaultValue !== 'undefined') {
          inputToFilter[field] = filters.defaultValue;
          return;
        }
      }
      errors = handleRequiredFields(required, field, errors);
    });
    errors = handleAllowUnknowns(this.allowUnknowns, leftOverInput, errors);
    errors = handleConflicts(inputToFilter, conflicts, errors);
    return new FiltererResponse(inputToFilter, errors, leftOverInput);
  }

  getOptions(): Object {
    return {
      allowUnknowns: this.allowUnknowns,
      defaultRequired: this.defaultRequired,
      filterAliases: this.filterAliases,
    };
  }

  getSpecification(): Object {
    return this.specification;
  }

  withOptions(options: Options): Filterer {
    return new Filterer(this.specification, options);
  }

  withSpecification(specification: Object): Filterer {
    return new Filterer(specification, this.getOptions());
  }
}

function arrayIntersection<T>(arrayOne: T[], arrayTwo: T[]): T[] {
  return arrayOne.filter((key) => arrayTwo.includes(key));
}

function arrayDifference<T>(arrayOne: T[], arrayTwo: T[]): T[] {
  return arrayOne.filter((key) => !arrayTwo.includes(key));
}

function assertFilterFunctionIsFunction(
  filterFunction: unknown,
  field: string,
): filterFunction is Function {
  if (typeof filterFunction !== 'function') {
    throw new Error(`filter ${JSON.stringify(filterFunction)} for field "${field}" is not a function`);
  }
  return true;
}

function assertFiltersIsAnObjectOrArray(filters: unknown, field: string): filters is {}|[] {
  if (typeof filters !== 'object') {
    throw new Error(`filters for field "${field}" was not an array or object`);
  }
  return true;
}

function assertFilterIsAnArray(filter: unknown, field: string): filter is [] {
  if (!Array.isArray(filter)) {
    throw new Error(`filter for field "${field}" was not an array`);
  }
  return true;
}

function assertFiltersIsAnArray(filters: unknown, field: string): filters is [] {
  if (!Array.isArray(filters)) {
    throw new Error(`filters for field "${field}" was not an array`);
  }
  return true;
}

function checkForUnknowns(leftOverInput: Object, existingErrors: string[]): string[] {
  const errors = [...existingErrors];
  Object.entries(leftOverInput).forEach(([field, value]) => {
    errors.push(`Field "${field}" with value ${JSON.stringify(value)} is unknown`);
  });
  return errors;
}

function extractConflicts(
  filters: FilterSpecification,
  field: string,
  existingConflicts: Object,
): Object {
  let { conflictsWith } = filters;
  if (conflictsWith == null) {
    return existingConflicts;
  }
  if (!Array.isArray(conflictsWith)) {
    conflictsWith = [conflictsWith];
  }
  const conflicts = { ...existingConflicts };
  conflicts[field] = conflictsWith;
  return conflicts;
}

function getRequired(filters: FilterSpecification, defaultRequired: boolean, field: string) {
  const { required = defaultRequired } = filters;
  if (required !== false && required !== true) {
    throw new Error(`required for field "${field}" is not a boolean`);
  }
  return required;
}

function handleAllowUnknowns(
  allowUnknowns: boolean,
  leftOverInput: Object,
  existingErrors: string[],
) {
  let errors = [...existingErrors];
  if (!allowUnknowns) {
    errors = checkForUnknowns(leftOverInput, errors);
  }
  return errors;
}

function handleConflicts(inputToFilter: Object, conflicts: Object, errors: string[]) {
  Object.entries(inputToFilter).forEach(([field]) => {
    if (typeof conflicts[field] === 'undefined') {
      return;
    }
    conflicts[field].forEach((conflictsWith: string) => {
      if (typeof inputToFilter[conflictsWith] !== 'undefined') {
        errors.push(`Field "${field}" cannot be given if field "${conflictsWith}" is present`);
      }
    });
  });
  return errors;
}

function handleCustomError(
  field: string,
  value: unknown,
  error: Error,
  errors: string[],
  customError: string = null,
) {
  let errorMessage = customError;
  if (errorMessage === null) {
    errorMessage = `Field "${field}" with value {value} failed filtering, message "${error.message}"`;
  }
  errors.push(errorMessage.replace('{value}', JSON.stringify(value)));
  return errors;
}

function handleFilterAliases(
  filterFunction: string|Function,
  filterAliases: Object,
): string|Function {
  if (typeof filterFunction === 'string' && typeof filterAliases[filterFunction] !== 'undefined') {
    return filterAliases[filterFunction];
  }
  return filterFunction;
}

function handleRequiredFields(required: boolean, field: string, errors: string[]): string[] {
  if (required) {
    errors.push(`Field "${field}" was required and not present`);
  }
  return errors;
}

function objectIntersection(objectOne: Object, objectTwo: Object): Object {
  const objectOneKeys = Object.keys(objectOne);
  const objectTwoKeys = Object.keys(objectTwo);
  const intersection = arrayIntersection(objectOneKeys, objectTwoKeys);
  if (intersection.length === 0) {
    return {};
  }
  return intersection.reduce((previousResult, key) => {
    const result = { ...previousResult };
    result[key] = objectOne[key];
    return result;
  }, {});
}

function objectDifference(objectOne: Object, objectTwo: Object): Object {
  const objectOneKeys = Object.keys(objectOne);
  const objectTwoKeys = Object.keys(objectTwo);
  const difference = arrayDifference(objectOneKeys, objectTwoKeys);
  if (difference.length === 0) {
    return {};
  }
  return difference.reduce((previousResult, key) => {
    const result = { ...previousResult };
    result[key] = objectOne[key];
    return result;
  }, {});
}

function filterObject(value: Object, specification: Object) {
  const filterer = new Filterer(specification);
  const filtererResponse = filterer.execute(value);
  if (!filtererResponse.success) {
    throw new FilterException(filtererResponse.errorMessage);
  }
  return filtererResponse.filteredValue;
}

function ofObjects(values: Object[], specification: FilterSpecification) {
  const results = [];
  const errors = [];
  values.forEach((item, index) => {
    if (item == null || typeof item !== 'object' || Array.isArray(item)) {
      errors.push(`Value at position "${index}" is not an object`);
      return;
    }
    const filterer = new Filterer(specification);
    const filtererResponse = filterer.execute(item);
    if (!filtererResponse.success) {
      errors.push(`Value at position "${index}" failed filtering, message "${filtererResponse.errorMessage}"`);
      return;
    }
    results.push(filtererResponse.filteredValue);
  });
  if (errors.length > 0) {
    throw new FilterException(errors.join('\n'));
  }
  return results;
}

function ofScalars(values: [], filters: FilterSpecification[]) {
  const wrappedFilters = {};
  const valuesAsObject = {};
  values.forEach((value, index) => {
    wrappedFilters[index] = filters;
    valuesAsObject[index] = value;
  });
  const filterer = new Filterer(wrappedFilters);
  const filtererResponse = filterer.execute(valuesAsObject);
  if (!filtererResponse.success) {
    throw new FilterException(filtererResponse.errorMessage);
  }
  return Object.values(filtererResponse.filteredValue);
}

function validateCustomError(filters: FilterSpecification, field: string) {
  const { customError } = filters;
  if (typeof customError !== 'undefined') {
    if (typeof customError !== 'string' || customError.trim() === '') {
      throw new Error(`customError for field "${field}" was not a non-empty string`);
    }
    return customError;
  }
  return null;
}
