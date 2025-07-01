package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/abh1SHAKE/go-git-it/backend/internal/models"
	"github.com/abh1SHAKE/go-git-it/backend/internal/repository"
	"github.com/abh1SHAKE/go-git-it/backend/internal/utils"
	"golang.org/x/crypto/bcrypt"
)

type UserController struct {
	UserRepo *repository.UserRepository
}

func NewUserController(repo *repository.UserRepository) *UserController {
	return &UserController{UserRepo: repo}
}

func (uc *UserController) Register(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Name string `json:"name"`
		Email string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	user := &models.User{
		Name: req.Name,
		Email: req.Email,
		PasswordHash: string(hashedPassword),
	}

	err = uc.UserRepo.CreateUser(user)
	if err != nil {
		http.Error(w, "Email already exists", http.StatusConflict)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"user": user,
	})
}

func (uc *UserController) Login(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Email string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	user, err := uc.UserRepo.GetUserByEmail(req.Email)
	if err != nil || user == nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password))
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		http.Error(w, "Could not generate token", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"token": token,
		"user": user,
	})
}