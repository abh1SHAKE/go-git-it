package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/abh1SHAKE/go-git-it/backend/internal/middleware"
	"github.com/abh1SHAKE/go-git-it/backend/internal/models"
	"github.com/abh1SHAKE/go-git-it/backend/internal/repository"
	"github.com/go-chi/chi/v5"
)

type SnippetController struct {
	SnippetRepo *repository.SnippetRepository
}

func NewSnippetController(repo *repository.SnippetRepository) *SnippetController {
	return &SnippetController{SnippetRepo: repo}
}

func (sc *SnippetController) CreateSnippet(w http.ResponseWriter, r *http.Request) {
	userID, ok := middleware.GetUserID(r)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var input struct {
		Title string `json:"title"`
		Code string `json:"code"`
		Language string `json:"language"`
		Public bool `json:"public"`
		Tags []string `json:"tags"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	snippet := &models.Snippet{
		UserID: userID,
		Title: input.Title,
		Code: input.Code,
		Language: input.Language,
		Public: input.Public,
	}

	tags := make([]string, 0, len(input.Tags))
	for _, tag := range input.Tags {
		trimmed := strings.TrimSpace(tag)
		if trimmed != "" {
			tags = append(tags, trimmed)
		}
	}

	err := sc.SnippetRepo.CreateSnippet(snippet, tags)
	if err != nil {
		http.Error(w, "Failed to create snippet", http.StatusInternalServerError)
		return
	}

	response, err := sc.SnippetRepo.GetSnippetByID(snippet.ID)
	if err != nil {
		http.Error(w, "Failed to fetch snippet", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

func (sc *SnippetController) GetAllPublicSnippets(w http.ResponseWriter, r *http.Request) {
	tag := r.URL.Query().Get("tag")

	var snippets []models.SnippetWithTags
	var err error 

	if tag != "" {
		snippets, err = sc.SnippetRepo.GetPublicSnippetsByTag(tag)
	} else {
		snippets, err = sc.SnippetRepo.GetAllPublicSnippets()
	}

	if err != nil {
		http.Error(w, "Failed to fetch snippets", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(snippets)
}

func (sc *SnippetController) GetMySnippets(w http.ResponseWriter, r *http.Request) {
	userID, ok := middleware.GetUserID(r)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	snippets, err := sc.SnippetRepo.GetSnippetsByUserID(userID)
	if err != nil {
		http.Error(w, "Failed to fetch snippets", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(snippets)
}

func (sc *SnippetController) GetSnippetByID(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid snippet ID", http.StatusBadRequest)
		return
	}

	snippet, err := sc.SnippetRepo.GetSnippetByID(id)
	if err != nil {
		http.Error(w, "Snippet not found", http.StatusNotFound)
		return
	}

	if !snippet.Public {
		userID, ok := middleware.GetUserID(r)
		if !ok || userID != snippet.UserID {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(snippet)
}

func (sc *SnippetController) UpdateSnippet(w http.ResponseWriter, r *http.Request) {
	userID, ok := middleware.GetUserID(r)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid snippet ID", http.StatusBadRequest)
		return
	}

	existing, err := sc.SnippetRepo.GetSnippetByID(id)
	if err != nil || existing == nil {
		http.Error(w, "Snippet not found", http.StatusNotFound)
		return
	}

	if existing.UserID != userID {
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}

	var input struct {
		Title *string `json:"title"`
		Code *string `json:"code"`
		Language *string `json:"language"`
		Public *bool `json:"public"`
		Tags []string `json:"tags"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if input.Title != nil {
		existing.Title = *input.Title
	}
	if input.Code != nil {
		existing.Code = *input.Code
	}
	if input.Language != nil {
		existing.Language = *input.Language
	}
	if input.Public != nil {
		existing.Public = *input.Public
	}

	var tagNames []string 
	if input.Tags != nil {
		tagNames = input.Tags
	} else {
		for _, tag := range existing.Tags {
			tagNames = append(tagNames, tag.Name)
		}
	}

	err = sc.SnippetRepo.UpdateSnippet(&existing.Snippet, tagNames)
	if err != nil {
		http.Error(w, "Failed to update snippet", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Snippet updated"})
}

func (sc *SnippetController) DeleteSnippet(w http.ResponseWriter, r *http.Request) {
	userID, ok := middleware.GetUserID(r)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid snippet ID", http.StatusBadRequest)
		return
	}

	err = sc.SnippetRepo.DeleteSnippet(id, userID)
	if err != nil {
		http.Error(w, "Failed to delete snippet", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Snippet deleted"})
}