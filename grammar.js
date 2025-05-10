/**
 * @file Rockstar grammar for tree-sitter
 * @author Moritz Tomann
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "rockstar",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
