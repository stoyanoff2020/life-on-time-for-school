import {
  NG_VALIDATORS,
  Validator,
  AbstractControl
} from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive( {
  selector: '[appConfirmEqualValidator]',
  providers: [ {
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualValidatorDirective,
    multi: true
  } ]
} )

export class ConfirmEqualValidatorDirective implements Validator {
  @Input() appConfirmEqualValidator: string
  validate( control: AbstractControl ): { [ key: string ]: any } | null {
    const controlToCompare = control.parent.get( this.appConfirmEqualValidator );
    if ( controlToCompare && control.value !== controlToCompare.value || controlToCompare === null ) {
      return { 'notEqual': true };
    }
    return null;
  }
}
// export function imageUrlValidator( control: AbstractControl ): { [ key: string ]: any } | null {
//   const imageValue = control.value;
//   if ( imageValue && imageValue.startsWith( 'http' ) &&
//     ( imageValue.endsWith( 'jpg' ) || imageValue.endsWith( 'png' ) ) ) {
//     return null;
//   } else {
//     return { 'imageUrl': true };
//   }
// };
