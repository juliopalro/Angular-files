/**
 * This pipe (filter) is based on
 * https://github.com/angular/angular/blob/5.1.2/packages/common/src/pipes/case_conversion_pipes.ts
 * which has been modified for accent characters.
 */

import {Pipe, PipeTransform} from '@angular/core';
import {invalidPipeArgumentError} from './invalid_pipe_argument_error';

var uppercases = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛÑÇ';
var lowercases = 'ãàáäâèéëêìíïîòóöôùúüûñç';

/**
 * Helper method to transform a single word to titlecase.
 */
function titleCaseWord(word: string) {
  if (!word) return word;
  return toUppercaseAccent(word[0]) + toLowercaseAccent(word.substr(1));
}
/**
 * Helper method to transform a single word to uppercase with accent mark.
 */
function toUppercaseAccent(word: string):string {
  for (var i = 0; i < lowercases.length; i++) {
    word = word.replace(lowercases.charAt(i), uppercases.charAt(i));
  };
  return word.toUpperCase();
}
/**
 * Helper method to transform a single word to lowercase with accent mark.
 */
function toLowercaseAccent(word: string):string {
  for (var i = 0; i < uppercases.length; i++) {
    word = word.replace(uppercases.charAt(i), lowercases.charAt(i));
  };
  return word.toLowerCase();
}

/**
 * Transforms text to titlecase.
 */
@Pipe({name: 'titlecase'})
export class TitleCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    if (typeof value !== 'string') {
      throw invalidPipeArgumentError(TitleCasePipe, value);
    }
    return value.split(' ').map(word => titleCaseWord(word)).join(' ');
  }
}

/**
 * Transforms text to uppercase.
 */
@Pipe({name: 'uppercase'})
export class UpperCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    if (typeof value !== 'string') {
      throw invalidPipeArgumentError(UpperCasePipe, value);
    }
    return toUppercaseAccent(value);
  }
}

/**
 * Transforms text to lowercase.
 */
@Pipe({name: 'lowercase'})
export class LowerCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    if (typeof value !== 'string') {
      throw invalidPipeArgumentError(LowerCasePipe, value);
    }
    return toLowercaseAccent(value);
  }
}

/**
 * Transforms text to capitalizecase.
 */
@Pipe({name: 'capitalize'})
export class CapitalizeCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    if (typeof value !== 'string') {
      throw invalidPipeArgumentError(CapitalizeCasePipe, value);
    }
    return toUppercaseAccent(value[0]) + toLowercaseAccent(value.substr(1));
  }
}
