import matchers from '@testing-library/jasmine-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// @testing-library/jasmine-dom expone los matchers como default export.
// Con la interop de Babel/Webpack puede venir en matchers o matchers.default.
const jasmineDomMatchers = matchers.default || matchers;

beforeEach(() => {
  jasmine.addMatchers(jasmineDomMatchers);
});
