// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-product
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Product } from '../models/index';

/*
 ==============================================================================
 HELPER FUNCTIONS
 If you find yourself creating the same helper functions across different
 test files, then extracting those functions into helper modules is an easy
 way to reduce duplication.

 Other tips:

 - Using the super awesome Partial<T> type in conjunction with Object.assign
   means you can:
   * customize the object you get back based only on what's important
   to you during a particular test
   * avoid writing test logic that is brittle with respect to the properties
   of your object
 - Making the input itself optional means you don't need to do anything special
   for tests where the particular details of the input don't matter.
 ==============================================================================
 *

/**
 * Generate a complete Product object for use with tests.
 * @param product A partial (or complete) Product object.
 */
export function givenProduct(product?: Partial<Product>) {
  const data = Object.assign(
    {
      name: 'big bread',
      price: 6.5,
      type: 'topping',
    },
    product,
  );
  return new Product(data);
}
