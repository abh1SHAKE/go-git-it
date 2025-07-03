package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/abh1SHAKE/go-git-it/backend/internal/repository"
)

type TagController struct {
	tagRepo *repository.TagRepository
}

func NewTagController(repo *repository.TagRepository) *TagController {
	return &TagController{tagRepo: repo}
}

func (tc *TagController) GetAllTags(w http.ResponseWriter, r *http.Request) {
	tags, err := tc.tagRepo.GetAllTags()
	if err != nil {
		http.Error(w, "Failed to fetch tags", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(tags)
}