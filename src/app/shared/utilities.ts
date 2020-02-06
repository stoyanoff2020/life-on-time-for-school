export function convertDateToString( dd: number, mm: number, yyyy: number, separator: string ): string {
  let day: string = dd < 10 ? '0' + dd : String( dd );
  let month: string = mm < 10 ? '0' + mm : String( mm );
  return ( yyyy + separator + month + separator + day );
}
