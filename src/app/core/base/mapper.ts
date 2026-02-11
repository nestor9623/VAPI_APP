//Using generic types , check if mapTo is needed in the future
export interface Mapper<I, O> {
  mapFrom(param: I): O;
  mapTo?(param: O): I;
}
