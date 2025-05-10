package tree_sitter_rockstar_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_rockstar "github.com/tomannmoritz/tree-sitter-rockstar/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_rockstar.Language())
	if language == nil {
		t.Errorf("Error loading Rockstar grammar")
	}
}
